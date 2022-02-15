import { Module } from '@nestjs/common';
import { NFTMediaFilesModule } from '../nft-media-files/nft-media-files.module';
import { SqsConsumerService } from './sqs-consumer.service';

@Module({
  imports: [NFTMediaFilesModule],
  providers: [SqsConsumerService],
  exports: [SqsConsumerService],
})
export class SqsConsumerModule {}
