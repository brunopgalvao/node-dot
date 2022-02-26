import { ApiPromise, WsProvider } from '@polkadot/api';
import { BN, formatBalance } from '@polkadot/util';

export const formatAccountBalance = async () => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    const { nonce, data: balance } = await api.query.system.account('14RYaXRSqb9rPqMaAVp1UZW2czQ6dMNGMbvukwfifi6m8ZgZ');
    const chainDecimals = api.registry.chainDecimals[0];
    // console.log(balance);
    console.log('raw balance:', balance.free.toNumber())
    formatBalance.setDefaults({ unit: 'DOT' });
    const defaults = formatBalance.getDefaults();
    const free = formatBalance(balance.free, { withSiFull: true }, chainDecimals);
    const reserved = formatBalance(balance.reserved, { withSiFull: true }, chainDecimals);
    // console.log(formatBalance.getDefaults());
    console.log('Formatted balance:', `{"free": "${free}", "unit": "${defaults.unit}", "reserved": "${reserved}", "nonce": "${nonce.toHuman()}"}`);
}