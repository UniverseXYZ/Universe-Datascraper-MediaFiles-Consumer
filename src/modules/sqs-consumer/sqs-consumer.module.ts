import { Module } from '@nestjs/common';
import { NFTMediaFilesModule } from '../nft-media-files/nft-media-files.module';
import { SqsConsumerService } from './sqs-consumer.service';
import { EthereumModule } from '../ethereum/ethereum.module';

@Module({
  imports: [NFTMediaFilesModule, EthereumModule],
  providers: [SqsConsumerService],
  exports: [SqsConsumerService],
})
export class SqsConsumerModule {}
