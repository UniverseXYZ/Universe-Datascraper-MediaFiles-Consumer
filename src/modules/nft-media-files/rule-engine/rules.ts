import { CryptopunksMediaFileHandler } from './cryptopunks';
import { IMediaFileHandler } from '../interface/media-handler';

interface IRule {
  contractAddress: string;
  mediaFileHandler: IMediaFileHandler;
}

export const Rules: IRule[] = [
  {
    contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    mediaFileHandler: CryptopunksMediaFileHandler,
  },
];
