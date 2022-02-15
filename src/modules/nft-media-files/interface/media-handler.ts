import { ethers } from 'ethers';

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
  ): Promise<IMediaFileFetcherResponse>;
}
