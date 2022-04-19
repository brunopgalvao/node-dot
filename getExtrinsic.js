import { ApiPromise, WsProvider } from '@polkadot/api';

export const getExtrinsic = async () => {

    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const exampleBlockNumber = 7200920
    const blockHash = await api.rpc.chain.getBlockHash(exampleBlockNumber);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const extrinsicHash = "0xeb8f2a5af4a82a237e7e270ed6bd51ce82bb9253802259fd0fdb24212fe65260"
    signedBlock.block.extrinsics.forEach(async (ex, index) => {
        if (extrinsicHash === ex.hash.toHex()) {
            console.log(index, ex.toHuman());
            const { method: { args, method, section } } = ex;
            console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
        }
    });
}