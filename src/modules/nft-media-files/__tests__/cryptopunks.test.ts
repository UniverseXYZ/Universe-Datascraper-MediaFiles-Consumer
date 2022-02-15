import { CryptopunksMediaFileHandler } from '../rule-engine/cryptopunks';
import { ethers } from 'ethers';
import { EthereumNetworkType } from '../../ethereum/interface';
describe('Cryptopunks Media Files', () => {
  it('should get metadata successfully', async () => {
    const ethersProvider = new ethers.providers.InfuraProvider(
      EthereumNetworkType['mainnet'],
      process.env.INFURA_PROJECT_ID,
    );
    const tokenId = '3102';

    const res = await CryptopunksMediaFileHandler(tokenId, ethersProvider);
    expect(res.success).toBe(true);
  });
});
