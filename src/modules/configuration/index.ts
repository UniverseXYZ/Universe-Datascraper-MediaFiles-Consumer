export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  port: process.env.APP_PORT,
  app_env: process.env.APP_ENV,
  alchemy_token: process.env.ALCHEMY_TOKEN,
  chainstack_url: process.env.CHAINSTACK_URL,
  ethereum_network: process.env.ETHEREUM_NETWORK,
  ethereum_quorum: process.env.ETHEREUM_QUORUM,
  infura: {
    project_id: process.env.INFURA_PROJECT_ID,
    project_secret: process.env.INFURA_PROJECT_SECRET,
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    queueUrl: process.env.AWS_QUEUE_URL,
    video_bucket: process.env.VIDEO_BUCKET,
    image_bucket: process.env.IMAGE_BUCKET,
    audio_bucket: process.env.AUDIO_BUCKET,
    model_bucket: process.env.MODEL_BUCKET,
    misc_bucket: process.env.MISC_BUCKET,
  },
  etherscan_api_key: process.env.ETHERSCAN_API_KEY,
  ipfs_gateway: process.env.IPFS_GATEWAY,
});
