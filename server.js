import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });
const exampleBlockNumber = 7200920
const blockHash = await api.rpc.chain.getBlockHash(exampleBlockNumber);
const signedBlock = await api.rpc.chain.getBlock(blockHash);

signedBlock.block.extrinsics.forEach((ex, index) => {
  console.log(index, ex.toHuman());
  const { method: { args, method, section } } = ex;
  console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
});