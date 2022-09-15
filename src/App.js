import './App.css';
import {useEffect, useState} from 'react';
import ConnectWeb3 from "./components/ConnectWeb3.tsx";
import Web3 from "web3";
import Navigation from "./components/Navigation";
import DApp from "./components/DApp";

import {Web3Context} from "./helpers/context"
import {ExposureInfo} from "./helpers/ExposureInfo";
import LoadingModal from "./components/LoadingModal";
import {ToastContainer} from 'react-toastify';
import {tokens_layout} from "./constants/tokens";
import {sleep} from "./helpers/util";
import {getBaskets, getTokens} from "./helpers/api";
import {baskets_layout} from "./constants/baskets";

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
  const [baskets, setBaskets] = useState([])
  const [tokens, setTokens] = useState([])

  const [refreshTimer, setRefreshTimer] = useState(null)

  const refreshData = async () => {
    let _baskets = await getBaskets()
    _baskets = _baskets.length > 0 ? _baskets : baskets_layout
    setBaskets(_baskets)

    let _tokens = await getTokens()
    _tokens = _tokens.length > 0 ? _tokens : tokens_layout
    setTokens(_tokens)

    console.log("test", _baskets, _tokens)

    if (_baskets)
      localStorage.setItem("baskets", JSON.stringify(_baskets))
    if (_tokens)
      localStorage.setItem("tokens", JSON.stringify(_tokens))

    let _account = account
    while (!_account) {
      await sleep(25)
      if (account == "" && web3) {
        _account = await web3.eth.getAccounts();
        _account = _account[0]

        setAccount(_account)
      }
    }

    let _exposureInfo = new ExposureInfo(provider, web3, "0x98d3CBEb3D6bC861e04c7d6238eD8107cE7F1703" )

    let _balances = {}

    for (const i in _tokens) {
      _balances[tokens_layout[i].token] = await _exposureInfo.getBalanceOfAddress(_tokens[i].tokenAddress, _account)
    }

    setExposureInfo(_exposureInfo)
    setBalances(_balances)
  }

  useEffect(() => {
    if (provider) {
      let _basket = JSON.parse(localStorage.getItem("baskets"))
      if (_basket.length > 0)
        setBaskets(_basket)

      let _tokens = JSON.parse(localStorage.getItem("tokens"))
      if (_tokens.length > 0)
        setTokens(_tokens)

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
        if (parseInt(chainId) != 43114 && chainId != 43113) {
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
    if (provider && account && web3 && balances && baskets.length > 0 && tokens.length > 0 && !ready) {
      setConnecting(false)
      setReady(true)
      setRefreshTimer(setInterval(refreshData, 10000))
    }
  }, [account, provider, web3, balances, exposureInfo])

  const setWeb3Data = async () => {
    let _web3 = await new Web3(provider);
    let chainID = await _web3.eth.getChainId()
    if (chainID != 43114 && chainID != 43113) {
      setLoadingMessage("Change your network to Avalanche to continue")
      return
    }
    setLoadingMessage("Loading account")
    let _account = await _web3.eth.getAccounts();


    setAccount(_account[0])
    setWeb3(_web3)


    await refreshData()

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
            <Web3Context.Provider value={{web3, provider, account, balances, exposureInfo, refreshData}}>
              <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Navigation account={account} disconnect={disconnect} />
              <DApp account={account} provider={provider} web3={web3} baskets={baskets}/>
              {showLoadingModal && <LoadingModal/>}
            </Web3Context.Provider>
          </div>
        }
      </div>

    </div>
  );
}



export default App;
