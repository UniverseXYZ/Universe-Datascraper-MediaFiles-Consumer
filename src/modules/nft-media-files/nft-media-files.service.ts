import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NFTTokensService } from '../nft-tokens/nft-tokens.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MediaMessage } from '../sqs-consumer/sqs-consumer.types';
import RandomString from 'randomstring';
import { extension } from 'mime-types';
import { MediaStorageService } from '../media-storage/media-storage.service';
import { IMediaFileFetcherResponse } from './interface/media-handler';
import { Rules } from './rule-engine/rules';
import { EthereumService } from '../ethereum/ethereum.service';
import { MediaFileType } from 'datascraper-schema';
import { getMediaTypeByContentType } from 'src/utils/getMediaType';

export interface AlternativeMediaFile {
  type: MediaFileType;
  url: string;
}

@Injectable()
export class NFTMediaFilesService {
  private readonly logger = new Logger(NFTMediaFilesService.name);

  constructor(
    protected readonly nftTokensService: NFTTokensService,
    protected readonly mediaStorageService: MediaStorageService,
    protected readonly ethereumService: EthereumService,
    protected readonly configService: ConfigService,
  ) {}

  async HandleMediaFiles(medias: MediaMessage): Promise<void> {
    const { contractAddress, tokenId, mediaFiles } = medias;
    if (contractAddress && tokenId) {
      this.logger.debug(
        `Handling media files for ${contractAddress}/${tokenId}`,
      );
      const mediaFileRule = Rules.find(
        (rule) => rule.contractAddress === contractAddress,
      );

      // Standard NFT
      if (!mediaFileRule) {
        await this.standardNFTMediaFileHandler(
          contractAddress,
          tokenId,
          mediaFiles,
        );
        this.logger.debug(
          `Standard NFT - Handled media files for ${contractAddress}/${tokenId}`,
        );
        return;
      }

      // Special NFT
      this.logger.debug(
        `Special NFT - Handling media files for ${contractAddress}/${tokenId}`,
      );
      const { success, file, extension, contentType } =
        await mediaFileRule.mediaFileHandler(
          tokenId,
          this.ethereumService.ether,
          contractAddress,
          this.nftTokensService,
        );
      if (success) {
        this.logger.debug(
          `Special NFT - Uploading media file for ${contractAddress}/${tokenId}`,
        );
        const alternativeMediaFiles: AlternativeMediaFile[] = [];
        const mediaType = getMediaTypeByContentType(contentType);
        const mediaPath = await this.uploadMediaFile(
          file,
          contractAddress,
          tokenId,
          extension,
          mediaType,
        );
        alternativeMediaFiles.push({
          type: mediaType,
          url: mediaPath,
        });
        this.logger.debug(
          `Special NFT - Media file ${mediaType}/${mediaPath} uploaded for ${contractAddress}/${tokenId}`,
        );
        await this.nftTokensService.updateMediaFiles(
          contractAddress,
          tokenId,
          alternativeMediaFiles,
        );
        this.logger.debug(
          `Special NFT - Handled media files for ${contractAddress}/${tokenId}`,
        );
      } else {
        this.logger.error('Special NFT - Fetching media files failed');
      }
    }
  }

  private async standardNFTMediaFileHandler(
    contractAddress: string,
    tokenId: string,
    mediaFiles: string[],
  ) {
    const alternativeMediaFiles: AlternativeMediaFile[] = [];
    for (let i = 0; i < mediaFiles.length; i++) {
      const mediaFileUrl = mediaFiles[i];
      const url = this.formatMediaUri(mediaFileUrl);
      this.logger.debug(
        `Standard NFT - Downloading media file ${url} for ${contractAddress}/${tokenId}`,
      );
      const { success, file, extension, contentType } =
        await this.downloadMediaFile(url);

      if (!success) {
        this.logger.error(
          `Standard NFT - Error downloading media file ${url} for ${contractAddress}/${tokenId}`,
        );
        continue;
      }

      this.logger.debug(
        `Standard NFT - Media file ${url} downloaded for ${contractAddress}/${tokenId}`,
      );

      const mediaType = getMediaTypeByContentType(contentType);
      const mediaPath = await this.uploadMediaFile(
        file,
        contractAddress,
        tokenId,
        extension,
        mediaType,
      );
      alternativeMediaFiles.push({
        type: mediaType,
        url: mediaPath,
      });
      this.logger.debug(
        `Standard NFT - Media file ${mediaType}/${mediaPath} uploaded for ${contractAddress}/${tokenId}`,
      );
      // if extension is html, add iframe alternative
      if (extension === 'html') {
        alternativeMediaFiles.push({
          type: MediaFileType.IFRAME,
          url: mediaFileUrl,
        });
      }
    }
    await this.nftTokensService.updateMediaFiles(
      contractAddress,
      tokenId,
      alternativeMediaFiles,
    );
    this.logger.debug(
      `Standard NFT - Media files updated in DB for ${contractAddress}/${tokenId}`,
    );
  }

  private async uploadMediaFile(
    file: any,
    contractAddress: string,
    tokenId: string,
    extension: string,
    mediaType: MediaFileType,
  ): Promise<string> {
    const fileName = `${RandomString.generate(6)}.${extension}`;
    const key = `${contractAddress}/${tokenId}/${fileName}`;
    const bucket = this.getBucketNameByMediaType(mediaType);
    const path = await this.mediaStorageService.upload(bucket, key, file);
    return path;
  }

  private async downloadMediaFile(
    url: string,
  ): Promise<IMediaFileFetcherResponse> {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      const statusCode = response.status;
      if (statusCode !== HttpStatus.OK) {
        this.logger.error(`Error downloading image from ${url}`);
        return { success: false };
      }
      const contentType = response.headers['content-type'];
      const ext = extension(contentType);

      return {
        success: true,
        file: response.data,
        extension: ext,
        contentType,
      };
    } catch (error) {
      this.logger.error(error);
      return { success: false };
    }
  }

  private getBucketNameByMediaType(mediaType: MediaFileType): string {
    switch (mediaType) {
      case MediaFileType.Image:
        return this.configService.get('aws.image_bucket');
      case MediaFileType.Video:
        return this.configService.get('aws.video_bucket');
      case MediaFileType.Audio:
        return this.configService.get('aws.audio_bucket');
      case MediaFileType.Model:
        return this.configService.get('aws.model_bucket');
      case MediaFileType.Misc:
        return this.configService.get('aws.misc_bucket');
    }
  }

  private formatMediaUri(url: string): string {
    const ipfsGateway = this.configService.get('ipfs_gateway');
    const regex = /^ipfs:\/\/(ipfs\/){0,1}/;
    const isIpfs = regex.test(url);
    if (isIpfs) {
      return url.replace(regex, ipfsGateway);
    } else {
      return url;
    }
  }
}
