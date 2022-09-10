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
        basketContractAddress: "0x98d3CBEb3D6bC861e04c7d6238eD8107cE7F1703",
        dexAddress: "https://traderjoexyz.com/trade?inputCurrency=AVAX\u0026outputCurrency=0x452cfC754A3889aaBD43Ec575bE62467859434B7#/",
        tokens: [{
            "name": "Token A/WAVAX",
            "token": "Token A",
            "quote": "WAVAX",
            "pairAddress": "0x2202497d8A65fc65540c3Bf189d6f8dA9756739B",
            "tokenAddress": "0x81aA662AA88fA2866dae2cd8F732CdDcC960B21a",
            "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
        },
            {
                "name": "Token B/WAVAX",
                "token": "Token B",
                "quote": "WAVAX",
                "pairAddress": "0x5F7Cf736DA5Ad0Dfe04516c8d32c9a348034Ad30",
                "tokenAddress": "0xbBaB816955660ff71F553bE0b942F51C83634cd2",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token C/WAVAX",
                "token": "Token C",
                "quote": "WAVAX",
                "pairAddress": "0xd32953c04A106a0753b29D371C1e7074C3cF8068",
                "tokenAddress": "0x1948EaB46Ff886190eBd50250EB486517e132F3B",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token D/WAVAX",
                "token": "Token D",
                "quote": "WAVAX",
                "pairAddress": "0x2e6431DA1DfeF4B09E9511fb737756c1A7F3ae68",
                "tokenAddress": "0xf84A51797c6A9A4BFb8E7206AA246d887031399b",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token E/WAVAX",
                "token": "Token E",
                "quote": "WAVAX",
                "pairAddress": "0x6cBB586CdDc9799b0101Cbc5d35C5b2412aaDDA6",
                "tokenAddress": "0x281D66d554D733DB0D03236ACAAe3746c2d3C2A8",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token F/WAVAX",
                "token": "Token F",
                "quote": "WAVAX",
                "pairAddress": "0x4217eacc1bd512B62eD8f2D49C0686a91DfE7706",
                "tokenAddress": "0x6D27b9c9d52dcd9D33E258463CAfA0B84EBA3FcD",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token G/WAVAX",
                "token": "Token G",
                "quote": "WAVAX",
                "pairAddress": "0xf96c875D888E76FBf2df62563946c1D0E66B350e",
                "tokenAddress": "0xB2bF61390A770c5883C6674E84Df8B789441156D",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token H/WAVAX",
                "token": "Token H",
                "quote": "WAVAX",
                "pairAddress": "0x042A7541f1cb77e571873fA38ce90d8F327198f7",
                "tokenAddress": "0x1D75Fe89157568e852Ad9bff6b4246e6Ce22EFC7",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token I/WAVAX",
                "token": "Token I",
                "quote": "WAVAX",
                "pairAddress": "0x44fdBC4455d97355a957D68A6eB2471B66987B65",
                "tokenAddress": "0x114419D1d4A6004aA6888Fc981Be77288447ef01",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
            },
            {
                "name": "Token J/WAVAX",
                "token": "Token J",
                "quote": "WAVAX",
                "pairAddress": "0xb6911DF489DFDcD0633b2FC5E1efa61bac41BBBd",
                "tokenAddress": "0xb119AbFA9dfA20ae4960F0BFe8E82149C1C9D669",
                "quoteAddress": "0x72187342BC71CAd08FcCC361ff8336A684dd6883"
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
                    <CollapsibleBasketData basket={basket} key={basket.name}/>

                )
            })}
        </div>
    </div>
}
