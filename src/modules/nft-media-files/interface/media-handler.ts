import { ethers } from 'ethers';
import { NFTTokensService } from 'src/modules/nft-tokens/nft-tokens.service';

export interface IMediaFileFetcherResponse {
  success: boolean;
  file?: any;
  extension?: string;
  contentType?: string;
}

export interface IMediaFileHandler {
  (
    tokenId: string,
    provider?: ethers.providers.BaseProvider,
    contractAddress?: string,
    tokenService?: NFTTokensService,
  ): Promise<IMediaFileFetcherResponse>;
}
