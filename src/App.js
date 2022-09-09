import './App.css';
import { useState, useEffect, createContext} from 'react';
import ConnectWeb3 from "./components/ConnectWeb3.tsx";
import Web3 from "web3";
import Navigation from "./components/Navigation";
import DApp from "./components/DApp";

import {Web3Context} from "./helpers/context"
import {ExposureInfo} from "./helpers/ExposureInfo";
import LoadingModal from "./components/LoadingModal";

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState("")
  const [web3, setWeb3] = useState(null)
  const [balances, setBalances] = useState(null)
  const [exposureInfo, setExposureInfo] = useState(null)
  const [ready, setReady] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [currentChainID, setCurrentChainID] = useState(1)
  const [loadingMessage, setLoadingMessage] = useState("Loading account")
  const [showLoadingModal, setShowLoadingModal] = useState(false)

  useEffect(() => {
    if (provider) {
      setWeb3Data()
      provider.on("accountsChanged", (accounts) => {
        if (accounts.length == 0) {
          disconnect()
        } else {
          setWeb3Data()
        }
      });
      provider.on("chainChanged", async (chainId) => {
        setCurrentChainID(parseInt(chainId))
        console.log(parseInt(chainId))
        if (parseInt(chainId) != 43114) {
          await resetData()
        }
        setWeb3Data()
      });
      provider.on("accountsChanged", (accounts) => {
        console.log("account changed")
        setShowLoadingModal(true)
        setWeb3Data()
      });
    }
  }, [provider])

  useEffect(() => {
    console.log("con", connecting)
  }, [connecting])

  useEffect(() => {
    if (provider && account && web3 && balances && !ready) {
      setConnecting(false)
      setReady(true)
    }
  }, [account, provider, web3, balances])

  const setWeb3Data = async () => {
    let _web3 = await new Web3(provider);
    console.log("id", await _web3.eth.getChainId())
    let chainID = await _web3.eth.getChainId()
    if (chainID != 43114) {
      setLoadingMessage("Change your network to Avalanche to continue")
      return
    }
    setLoadingMessage("Loading account")
    let _account = await _web3.eth.getAccounts();
    let _exposureInfo = new ExposureInfo(provider, _web3, "0x452cfC754A3889aaBD43Ec575bE62467859434B7" )
    let _portions = await _exposureInfo.getPortions()

    let _balances = {}

    Object.keys(_portions).map((asset) => {
      _balances[asset] = 1
    })

    setAccount(_account[0])
    setWeb3(_web3)
    setExposureInfo(_exposureInfo)
    setBalances(_balances)
    setShowLoadingModal(false)
  }

  const disconnect = () => {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
    setProvider(null)
    resetData()
  }

  const resetData = () => {
    setWeb3(null)
    setAccount("")
    setLoadingMessage("Loading account")
    setReady(false)
  }

  return (
    <div className="App">
      <div style={{maxWidth: "1800px", marginLeft: "auto", marginRight: "auto"}}>
        {!ready ?
          <header className="App-header">
            <h3>
              Exposure Market Baskets
            </h3>
            <ConnectWeb3 setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting} connecting={connecting} loadingMessage={loadingMessage} chainID={currentChainID}/>
          </header>
          :
          <div>
            <Web3Context.Provider value={{web3, provider, account, balances, exposureInfo}}>
              <Navigation account={account} disconnect={disconnect} />
              <DApp account={account} provider={provider} web3={web3}/>
              {showLoadingModal && <LoadingModal/>}
            </Web3Context.Provider>
          </div>
        }
      </div>

    </div>
  );
}



export default App;
