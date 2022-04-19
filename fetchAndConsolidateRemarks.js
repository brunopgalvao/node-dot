const { fetchRemarks, getRemarksFromBlocks, getLatestFinalizedBlock, Consolidator, RemarkListener } = require('rmrk-tools');
const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('wss://node.rmrk.app');

exports.fetchAndConsolidateRemarks = async () => {
    try {
        const api = await ApiPromise.create({ provider: wsProvider });
        const to = await getLatestFinalizedBlock(api);

        const remarkBlocks = await fetchRemarks(api, 6431424, to, ['']);
        if (remarkBlocks) {
            const remarks = getRemarksFromBlocks(remarkBlocks);
            console.log(remarks);
            const consolidator = new Consolidator();
            const { nfts, collections } = consolidator.consolidate(remarks);
            console.log('Consolidated nfts:', nfts);
            console.log('Consolidated collections:', collections);
        }

        const consolidateFunction = async (remarks) => {
            const consolidator = new Consolidator();
            return consolidator.consolidate(remarks);
        };

        const startListening = async () => {
            const listener = new RemarkListener({ polkadotApi: api, prefixes: [], consolidateFunction });
            const subscriber = listener.initialiseObservable();
            subscriber.subscribe((val) => console.log(val));
        };

        startListening();
    } catch (error) {
        console.log(error)
    }
}