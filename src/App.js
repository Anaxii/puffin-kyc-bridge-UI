import './App.css';
import { useState, useEffect, createContext} from 'react';
import ConnectWeb3 from "./components/ConnectWeb3.tsx";
import Web3 from "web3";
import Navigation from "./components/Navigation";
import DApp from "./components/DApp";

import {Web3Context} from "./helpers/context"

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState("")
  const [web3, setWeb3] = useState(null)
  const [ready, setReady] = useState(false)

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
    }
  }, [provider])

  useEffect(() => {
    if (provider && !ready) {
      setReady(true)
    }
  }, [account])

  const setWeb3Data = async () => {
    let _web3 = await new Web3(provider);
    let _account = await _web3.eth.getAccounts();
    setAccount(_account[0])
    setWeb3(_web3)
  }

  const disconnect = () => {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
    setProvider(null)
    setWeb3(null)
    setAccount("")
    setReady(false)
  }

  return (
    <div className="App">
      {!ready ?
        <header className="App-header">
        <h3>
          Exposure Market Baskets
        </h3>
        <ConnectWeb3 setProvider={setProvider} setWeb3={setWeb3}/>
      </header>
        :
      <div>
        <Web3Context.Provider value={{web3, provider, account}}>
          <Navigation account={account} disconnect={disconnect}/>
          <DApp account={account} provider={provider} web3={web3}/>
        </Web3Context.Provider>
      </div>
      }

    </div>
  );
}



export default App;
