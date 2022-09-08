import {useState, useEffect} from 'react';
import CollapsibleBasketData from "./CollapsibleBasketData";

let baskets = [
    {
        "name": "XPSR Alpha 10",
        "symbol": "XPSRA10",
        holders: 10,
        aum: 100000,
        marketPrice: 100,
        indexPrice: 101.8,
        nav: 100000,
        basketCap: 100,
        supply: 100,
        navPerShare: 1000,
        basketContractAddress: "0x452cfC754A3889aaBD43Ec575bE62467859434B7",
        dexAddress: "https://traderjoexyz.com/trade?inputCurrency=AVAX\u0026outputCurrency=0x452cfC754A3889aaBD43Ec575bE62467859434B7#/",
        tokens: [{
            "name": "JoeToken/WAVAX",
            "token": "JoeToken",
            "quote": "WAVAX",
            "pairAddress": "0x454E67025631C065d3cFAD6d71E6892f74487a15",
            "tokenAddress": "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Yeti Finance/WAVAX",
            "token": "Yeti Finance",
            "quote": "WAVAX",
            "pairAddress": "0xbdc7EF37283BC67D50886c4afb64877E3e83f869",
            "tokenAddress": "0x77777777777d4554c39223C354A05825b2E8Faa3",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Platypus/WAVAX",
            "token": "Platypus",
            "quote": "WAVAX",
            "pairAddress": "0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23",
            "tokenAddress": "0x22d4002028f537599bE9f666d1c4Fa138522f9c8",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Echidna Token/WAVAX",
            "token": "Echidna Token",
            "quote": "WAVAX",
            "pairAddress": "0x218e6A0AD170460F93eA784FbcC92B57DF13316E",
            "tokenAddress": "0xeb8343D5284CaEc921F035207ca94DB6BAaaCBcd",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Vector Finance/WAVAX",
            "token": "Vector Finance",
            "quote": "WAVAX",
            "pairAddress": "0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929",
            "tokenAddress": "0x5817D4F0b62A59b17f75207DA1848C2cE75e7AF4",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Wrapped Ether/WAVAX",
            "token": "Wrapped Ether",
            "quote": "WAVAX",
            "pairAddress": "0xFE15c2695F1F920da45C30AAE47d11dE51007AF9",
            "tokenAddress": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Magic Internet Money/WAVAX",
            "token": "MIM",
            "quote": "WAVAX",
            "pairAddress": "0x781655d802670bbA3c89aeBaaEa59D3182fD755D",
            "tokenAddress": "0x130966628846BFd36ff31a822705796e8cb8C18D",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "GMX/WAVAX",
            "token": "GMX",
            "quote": "WAVAX",
            "pairAddress": "0x0c91a070f862666bBcce281346BE45766d874D98",
            "tokenAddress": "0x62edc0692BD897D2295872a9FFCac5425011c661",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }, {
            "name": "Staked AVAX/WAVAX",
            "token": "Staked AVAX",
            "quote": "WAVAX",
            "pairAddress": "0x4b946c91C2B1a7d7C40FB3C130CdfBaf8389094d",
            "tokenAddress": "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "price": 10,
            "marketCap": 100000,
            "weight": 0.1,
            "portions": 10
        }]
    }
]

export default function DApp(props: any) {

    useEffect(() => {
    }, [])


    async function connectWallet() {
        // @ts-ignore
        const provider = await web3Modal.connect();
        props.setProvider(provider)
    }

    return <div className={"dapp"}>
        <h2>
            Available Baskets
        </h2>
        <div className={"basket-list-header"}>
            <p style={{textAlign: "left"}}>
                Name
            </p>
            <p>
                Balance
            </p>
            <p>
                Value
            </p>
            <p>
                NAV
            </p>
            <p>
                Supply
            </p>
            <p>
                Holders
            </p>
            <p>
                Market Price
            </p>
            <p>
                Index Price
            </p>
        </div>
        <div>
            {baskets.map((basket, index) => {
                return (
                    <CollapsibleBasketData basket={basket} provider={props.provider} web3={props.web3}/>

                )
            })}
        </div>
    </div>
}
