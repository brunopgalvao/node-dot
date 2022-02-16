import { ApiPromise, WsProvider } from '@polkadot/api';

export const getAllData = async () => {

    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const lastHeader = await api.rpc.chain.getHeader();
    let blockNumber = lastHeader.number;

    while (blockNumber > 0) {
        blockNumber = blockNumber - 1
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);
        signedBlock.block.extrinsics.forEach(async (ex, index) => {
            console.log(index, ex.toHuman());
            const { method: { args, method, section } } = ex;
            console.log("******EXTRINSIC--BEGIN***");
            console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
            console.log("******EXTRINSIC--END*****");
            
            const allRecords = await api.query.system.events.at(blockHash);
            // filter the specific events based on the phase and then the
            // index of our extrinsic in the block
            const events = allRecords
                .filter(({ phase }) =>
                    phase.isApplyExtrinsic &&
                    phase.asApplyExtrinsic.eq(index)
                )
                .map(({ event }) => `${event.section}.${event.method}`);

            console.log("******EVENT--BEGIN*****");
            console.log(`${section}.${method}:: ${events.join(', ') || 'no events'}`);
            console.log("******EVENT--END*******");
        });
    }

}