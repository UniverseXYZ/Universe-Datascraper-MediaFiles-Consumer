import { ethers } from 'ethers';
import { IMediaFileHandler } from '../interface/media-handler';
const CRYPTOPUNKS_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint16',
      },
    ],
    name: 'punkImageSvg',
    outputs: [
      {
        name: 'svg',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as any;

const CRYPTOPUNKS_METADATA_ADDRESS =
  '0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2';
export const CryptopunksMediaFileHandler: IMediaFileHandler = async (
  tokenId: string,
  provider: ethers.providers.BaseProvider,
) => {
  const contract = new ethers.Contract(
    CRYPTOPUNKS_METADATA_ADDRESS,
    CRYPTOPUNKS_ABI,
    provider,
  );
  const imageSvg = await contract.punkImageSvg(Number(tokenId));
  return {
    success: true,
    file: imageSvg,
    extension: 'svg',
    contentType: 'image/svg+xml',
  };
};
