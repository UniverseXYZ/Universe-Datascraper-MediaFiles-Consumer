import { CryptopunksMediaFileHandler } from './cryptopunks';
import { IMediaFileHandler } from '../interface/media-handler';
import { CryptofootballMediaFileHandler } from './cryptofootball';

interface IRule {
  contractAddress: string;
  mediaFileHandler: IMediaFileHandler;
}

export const Rules: IRule[] = [
  {
    contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
    mediaFileHandler: CryptopunksMediaFileHandler,
  },
  {
    contractAddress: '0x6e1b98153399d5E4e710c1A0b803c74d3d7F2957',
    mediaFileHandler: CryptofootballMediaFileHandler,
  },
];
