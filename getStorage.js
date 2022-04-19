import { ApiPromise, WsProvider } from '@polkadot/api';

export const getStorage = async () => {

    const wsPolkadotProvider = new WsProvider('wss://rpc.polkadot.io');
    const polkadotApi = await ApiPromise.create({ provider: wsPolkadotProvider });
    console.log(await polkadotApi.query.staking)

    // Rococo
    const wsRococoProvider = new WsProvider('wss://rococo-rpc.polkadot.io');
    const rococoApi = await ApiPromise.create({ provider: wsRococoProvider });
    console.log(await rococoApi.query.staking)
}