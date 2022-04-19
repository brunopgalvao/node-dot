import { ApiPromise, WsProvider } from '@polkadot/api';

export const fetchCodeHash = async () => {
    // Canvas
    const wsCanvasProvider = new WsProvider('wss://rococo-canvas-rpc.polkadot.io');
    const canvasApi = await ApiPromise.create({ provider: wsCanvasProvider });
    const account = "0x2ce787b4b143ff878457c7dc9dc44e34a22e3fa9db5a8fad07bfb384b99c614b";
    console.log((await canvasApi.query.contracts.codeStorage(account)).toHuman());
}