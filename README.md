# Universe Datascraper Media Files Consumer

## Description

This consumer is to fetch NFT's media files by given a token id, a NFT contract address and a array of media file's URL (can be an empty array if the fetching media file method handled in rule engine), which are passed from MediaFile Producer via SQS.
The media files will be uploaded to our own cloud storage (currently it's S3).

Rule engine is used to define different ways to download media files of NFTs. The table below shows current covered special NFTs.

| NFT Name      | NFT contract address           |
| ------------- | ------------- |
| Cryptofootball      | 0x6e1b98153399d5E4e710c1A0b803c74d3d7F2957 |
| Cryptopunks | 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB |

## Requirements

- NodeJS version 14+
- NPM

## Required External Service

- AWS SQS
- AWS S3
- Infura
- MongoDB

## Primary Third Party Libraries

- NestJS
- Mongoose (MongoDB)
- bbc/sqs-producer (Only applicable for producers)
- bbc/sqs-consumer (Only applicable for consumers)

## DataFlow

### Input Data

The MediaFile producer sends the messages that contain below parameters to this consumer.

- NFT contract address
- Token Id
- An array of media file URLs (can be an empty array in some special NFTs), and the URLs are "image" and "animation_url" from metadata.

### Supported Media Types

When downloading media files, the Content-type from the response header is used to classify the types of media file.
More information of Content-type, please check this [link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

| Content-type      | Media type           | File format | S3 bucket |
| ------------- | ------------- | ------------- | ------------- |
| video/xxx      | Video | mp4, etc.| nft-scraper-media-videos |
| image/xxx      | Image | jpeg, png, svg+xml, etc. | nft-scraper-media-files |
| audio/xxx | Audio | mp3, etc.| nft-scraper-media-audio |
| model/xxx | Model | gltf-binary, gltf+json, mesh, obj, etc. | nft-scraper-media-models |
| others | Misc | html, pdf, etc. | nft-scraper-media-misc |

For Misc type media file, an extra URL ('iframe' type with NFT's original URL) will be added in 'AlternativeMediaFiles' field in DB.

### Data Analysis and Storage

- For standard NFT, download media file from the URLs in the array, and then upload to S3, and then store the new path in DB as alternativeMediaFiles.
- For special NFT, need to implement specific handler in rule engine.
- The new media paths will be stored in 'AlternativeMediaFiles' field.

### Output

The downloaded media files are stored in S3 bucket, and the new S3 paths are stored in NFT token collection.

- NFT token
- S3

## MongoDB Collection Usage

This consumer leverage the following data collection in [schema](https://github.com/plugblockchain/Universe-Datascraper-Schema)

- NFT Tokens: store extracted NFT tokens.
