import { ethers } from 'ethers';
import { NFTTokensService } from 'src/modules/nft-tokens/nft-tokens.service';
import { IMediaFileHandler } from '../interface/media-handler';

export const CryptofootballMediaFileHandler: IMediaFileHandler = async (
  tokenId: string,
  provider: ethers.providers.BaseProvider,
  contractAddress: string,
  tokenService: NFTTokensService,
) => {
  const token = await tokenService.getToken(contractAddress, tokenId);
  if (!token || !token.metadata) {
    return { success: false };
  }

  const encodedImageData = token.metadata.image.replace(
    'data:image/svg+xml;base64,',
    '',
  );
  const decodedImageData = Buffer.from(encodedImageData, 'base64').toString();
  return {
    success: true,
    file: decodedImageData,
    extension: 'svg',
    contentType: 'image/svg+xml',
  };
};
