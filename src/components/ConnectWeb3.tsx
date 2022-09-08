import Web3Modal from 'web3modal'
import {useState, useEffect} from 'react';
import Web3 from "web3";

export default function ConnectWeb3(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)

    useEffect(() => {
        const providerOptions = {
            injected: {
                package: null,
            },
        };

        const newWeb3Modal = new Web3Modal({
            cacheProvider: true, // very important
            network: "mainnet",
            providerOptions,
        });

        // @ts-ignore
        setWeb3Modal(newWeb3Modal)
    }, [])

    useEffect(() => {
        // @ts-ignore
        if (web3Modal && web3Modal.cachedProvider) {
            connectWallet()
        }
    }, [web3Modal])

    async function connectWallet() {
        // @ts-ignore
        const provider = await web3Modal.connect();
        if (provider) {
            props.setWeb3(await new Web3(provider))
            props.setProvider(provider)
        }
    }

    return <button className={"primary-btn"} onClick={connectWallet}>Connect wallet</button>
}
