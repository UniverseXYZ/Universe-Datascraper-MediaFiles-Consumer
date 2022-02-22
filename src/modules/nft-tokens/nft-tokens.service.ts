import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NFTToken, NFTTokensDocument } from './schemas/nft-tokens.schema';
import { AlternativeMediaFile } from 'datascraper-schema';

@Injectable()
export class NFTTokensService {
  constructor(
    @InjectModel(NFTToken.name)
    private readonly nftTokensModel: Model<NFTTokensDocument>,
  ) {}

  async updateMediaFiles(
    contractAddress: string,
    tokenId: string,
    alternativeMediaFiles: AlternativeMediaFile[],
  ) {
    await this.nftTokensModel.updateOne(
      { contractAddress, tokenId },
      { alternativeMediaFiles },
    );
  }

  async getToken(
    contractAddress: string,
    tokenId: string,
  ): Promise<NFTTokensDocument> {
    return this.nftTokensModel.findOne({ contractAddress, tokenId });
  }
}
