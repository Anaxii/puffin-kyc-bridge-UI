import Web3Modal from 'web3modal'
import {useState, useEffect} from 'react';
import Web3 from "web3";
import {InfinitySpin} from 'react-loader-spinner'
import {chainIds} from "../constants/chainIds";

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
            props.setConnecting(true)
            props.setWeb3(await new Web3(provider))
            props.setProvider(provider)
        }
    }

    return (
        <div>
            {!props.connecting ?
                <div>
                    <button className={"primary-btn"} onClick={connectWallet}>Connect wallet</button>
                    <br/>
                </div>
                :
                <InfinitySpin
                    width='200'
                    color="#515DFB"
                />
            }
            {props.connecting &&
            <div>
              <button className={"primary-btn"} onClick={addNetwork}>Add Fuji to Wallet</button>
              <p style={{paddingTop: "15px"}}>{props.loadingMessage}
              </p>
                {props.chainID != 43114 && <p>Current
                  Blockchain: {(chainIds[Number(props.chainID)]).charAt(0).toUpperCase() + (chainIds[Number(props.chainID) || 1]).slice(1)}
                </p>}
            </div>
            }
        </div>

    )
}

const addNetwork = async (): Promise<void> => {
    if (window.ethereum == undefined) {
        window.open('https://metamask.io/download', '_blank')
    }

    await window?.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: `0x${(43113).toString(16)}`,
            chainName: "AVAX",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://testnet.snowtrace.io/"]
        }]
    }).catch((error: any): void => {
        console.log(error)
    })
}
