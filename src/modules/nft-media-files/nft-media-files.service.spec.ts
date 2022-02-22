import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { NFTMediaFilesService } from './nft-media-files.service';
import configuration from '../configuration';
import { NFTTokensService } from '../nft-tokens/nft-tokens.service';
import { MediaStorageService } from '../media-storage/media-storage.service';
import { EthereumService } from '../ethereum/ethereum.service';
import { NFTTokensDocument } from 'datascraper-schema';

describe('NFT Media files', () => {
  let service: NFTMediaFilesService;
  let nftTokensService: NFTTokensService;
  let mediaStorageService: MediaStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: false,
          ignoreEnvVars: false,
          isGlobal: true,
          load: [configuration],
        }),
      ],
      providers: [
        NFTMediaFilesService,
        MediaStorageService,
        EthereumService,
        {
          provide: NFTTokensService,
          useValue: {
            updateMediaFiles: jest.fn(),
            getToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NFTMediaFilesService>(NFTMediaFilesService);
    mediaStorageService = module.get<MediaStorageService>(MediaStorageService);
    nftTokensService = module.get<NFTTokensService>(NFTTokensService);
  });

  it('should save new uploaded image file successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x0974e6c435C18DdfBbc1F500EDE24F99C3cf07F2',
      tokenId: '1887',
      mediaFiles: ['https://www.theroyalcubs.com/cubs/1887.png'],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValueOnce(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  it('should save new uploaded image and video files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x6f9Eb87f5a5638A3424c68FfAe824608671F4EA6',
      tokenId: '1064',
      mediaFiles: [
        'https://mainnet---metadata-xlemkv6zwa-uc.a.run.app/thumbnails/1064',
        'https://mainnet---metadata-xlemkv6zwa-uc.a.run.app/video/1064',
      ],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });
  it('should save new uploaded image and video files when media files are on ipfs successfully', async () => {
    const mediaMsg = {
      contractAddress: '0xCcc441ac31f02cD96C153DB6fd5Fe0a2F4e6A68d',
      tokenId: '8710',
      mediaFiles: [
        'ipfs://QmV7pvWoKuvKwPn1tBbpothzt3nf2p7wjtHJ2VAsVjWL9N',
        'ipfs://QmdhGuuajAzVRKQLgQC4jE4R4fGyrg7zQZeH9WJgWPm2q9',
      ],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  it('Cryptopunks - should save new uploaded image and video files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      tokenId: '3102',
      mediaFiles: [],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  // other types of media files
  it('Cyberkongz VX - should save new uploaded media files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x7EA3Cca10668B8346aeC0bf1844A49e995527c8B',
      tokenId: '1',
      mediaFiles: [
        'https://cyberkongz.fra1.cdn.digitaloceanspaces.com/public/1/1_preview.jpg',
        'https://vxviewer.vercel.app/1',
      ],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  it('ASM AIFA Genesis - should save new uploaded media files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x26437d312fB36BdD7AC9F322A6D4cCFe0c4FA313',
      tokenId: '1',
      mediaFiles: [
        'https://boxset.aifa.football/img/1.png',
        'https://boxset.aifa.football/html/1.html',
      ],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  it('adidas Originals: Into the Metaverse - should save new uploaded media files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x28472a58A490c5e09A238847F66A68a47cC76f0f',
      tokenId: '0',
      mediaFiles: ['ipfs://Qmb4VB12RsXW6DaKranEdgnMUTzfyVBEb5eZ1v7JCEUxL1/'],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest
      .spyOn(nftTokensService, 'updateMediaFiles')
      .mockImplementation(async () => {});
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });

  it('Cryptofootball - should save new uploaded media files successfully', async () => {
    const mediaMsg = {
      contractAddress: '0x6e1b98153399d5E4e710c1A0b803c74d3d7F2957',
      tokenId: '1',
      mediaFiles: [],
    };
    jest
      .spyOn(mediaStorageService, 'upload')
      .mockReturnValue(Promise.resolve('https://image.com'));
    jest.spyOn(nftTokensService, 'getToken').mockReturnValue(
      Promise.resolve({
        contractAddress: '0x6e1b98153399d5E4e710c1A0b803c74d3d7F2957',
        tokenId: '1',
        metadata: {
          image:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgZm9udC1zaXplOiAxNHB4OyB9PC9zdHlsZT48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz48dGV4dCB4PSIxMCIgeT0iMjAiIGNsYXNzPSJiYXNlIiBmb250LXNpemU9ImxhcmdlciIgZm9udC13ZWlnaHQ9ImJvbGQiPlRlYW0gIzE8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+U2FtIERhcm5vbGQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+Q2hhc2UgQ2xheXBvb2w8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjgwIiBjbGFzcz0iYmFzZSI+Q2VlRGVlIExhbWI8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEwMCIgY2xhc3M9ImJhc2UiPk1pa2UgRGF2aXM8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEyMCIgY2xhc3M9ImJhc2UiPkNodWJhIEh1YmJhcmQ8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjE0MCIgY2xhc3M9ImJhc2UiPkRhbGxhcyBHb2VkZXJ0PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Mb2dhbiBUaG9tYXM8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjE4MCIgY2xhc3M9ImJhc2UiPk8uSi4gSG93YXJkPC90ZXh0Pjwvc3ZnPg==',
        },
      } as NFTTokensDocument),
    );
    await service.HandleMediaFiles(mediaMsg);
    expect(mediaStorageService.upload).toBeCalled();
    expect(nftTokensService.updateMediaFiles).toBeCalled();
  });
});
