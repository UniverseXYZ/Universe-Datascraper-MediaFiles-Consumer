import { Module } from '@nestjs/common';
import { EthereumModule } from '../ethereum/ethereum.module';
import { MediaStorageModule } from '../media-storage/media-storage.module';
import { NFTTokensModule } from '../nft-tokens/nft-tokens.module';
import { NFTMediaFilesService } from './nft-media-files.service';

@Module({
  imports: [MediaStorageModule, NFTTokensModule, EthereumModule],
  providers: [NFTMediaFilesService],
  exports: [NFTMediaFilesService],
})
export class NFTMediaFilesModule {}
