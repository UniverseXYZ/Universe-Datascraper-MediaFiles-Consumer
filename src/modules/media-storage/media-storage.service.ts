import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

export interface MediaFile {
  imageUrl: string;
  animationUrl?: string;
}

@Injectable()
export class MediaStorageService {
  private readonly logger = new Logger(MediaStorageService.name);
  private s3Client: AWS.S3;

  constructor(protected readonly configService: ConfigService) {
    const region = this.configService.get('aws.region');
    const accessKeyId = this.configService.get('aws.accessKeyId');
    const secretAccessKey = this.configService.get('aws.secretAccessKey');
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'Initialize AWS S3 failed, please check required variables',
      );
    }
    this.s3Client = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  async upload(
    bucket: string,
    key: string,
    data: any,
  ): Promise<string | undefined> {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: data,
    };
    try {
      const res = await this.s3Client.upload(params).promise();
      return res?.Location;
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }
}
