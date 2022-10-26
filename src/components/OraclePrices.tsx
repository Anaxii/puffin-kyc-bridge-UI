import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";

import SubnetOracle from "../constants/abi/SubnetOracle.json";
import 'react-dropdown/style.css';
import {formatNumber} from "../helpers/util";

export default function OraclePrices(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [subnetTokens, setSubnetTokens]: any = useState([]);
    const [mainnetTokens, setMainnetTokens]: any = useState([]);
    const [prices, setPrices]: any = useState({});
    const [_interval, _setInterval]: any = useState(null);

    const getPrices = async () => {
        let _prices: any = {}
        for (const i in subnetTokens) {
            let contract = new web3Context.web3.eth.Contract(SubnetOracle, "0x783963886f96cD9C8CC42A2068BC6FdfFb4982d2")
            let _price = await contract.methods.price(subnetTokens[i].value).call()
            _price = Number(BigInt(_price) / BigInt(10**10)) / (10**8)
            _prices[subnetTokens[i].label] = _price
        }
        for (const i in mainnetTokens) {
            let contract = new web3Context.web3.eth.Contract(SubnetOracle, "0x42e01bc57d6Cc25F33d913bD1e0A8C4AA1A9Bdb6")
            let _price = await contract.methods.price(mainnetTokens[i].pair).call()
            _price = Number(BigInt(_price) / BigInt(10**10)) / (10**8)
            _prices[mainnetTokens[i].label] = _price
        }
        console.log("price", _prices)
        setPrices(_prices)
    }

    useEffect(() => {
        if (subnetTokens.length == 0 || mainnetTokens.length == 0)
            return
        getPrices()
        if (!_interval)
            _setInterval(_setInterval(getPrices(), 20000))

    }, [subnetTokens, mainnetTokens])

    useEffect(() => {
        let _subnetOptions: any = []
        let _mainnetOptions: any = []
        for (const i in props.tokens) {
            if (props.tokens[i].name.includes("Subnet")) {
                _subnetOptions.push({value: props.tokens[i].tokenAddress, label: props.tokens[i].token, pair: props.tokens[i].pairAddress})
            } else {
                _mainnetOptions.push({value: props.tokens[i].tokenAddress, label: props.tokens[i].token, pair: props.tokens[i].pairAddress})
            }
        }
        setSubnetTokens(_subnetOptions)
        setMainnetTokens(_mainnetOptions)
    }, [props.tokens])

    return (
        <div>
            {props.tokens.map((token: any, index: any) => {
                if (token.name == "WAVAX/USDC")
                    return
                return <div className={"token-list"} style={{width: "100%"}}>
                    {!token.name.includes("Subnet") ? <p>{token.name}</p> : <p>{token.token +"/USD"}</p>}
                    <p>
                        {prices[token.token]}
                    </p>
                </div>
            })}
        </div>
    );
}
