import CollapsibleBasketData from "./CollapsibleBasketData";
import {formatNumber} from "../helpers/util";
import BridgeModal from "./BridgeModal";
import OraclePrices from "./OraclePrices";
import Verify from "./Verify";
import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";
import ExposureMainnetBridgeABI from "../constants/abi/MainnetBridge.json"

export default function DApp(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [isAllowed, setIsAllowed] = useState(false);
    const [timer, setTimer]: any = useState(null);

    const checkIsValid = async () => {
        let contract = new web3Context.web3.eth.Contract(ExposureMainnetBridgeABI, "0x555A7C8F6B5f0c2Aaa6c94dbC6199C8EA82182a9")
        let val = await contract.methods.isAllowed(props.account).call()
        console.log(val)
        setIsAllowed(val)
        if (val && timer)
            clearInterval(timer)
    }

    useEffect(() => {
        checkIsValid()
        if (!timer)
            setTimer(setTimeout(checkIsValid, 3000))
    }, [web3Context])

    return <div className={"dapp"}>
        {!isAllowed ?
            <div>
                <Verify/>
            </div>
            :
            <div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <div>
                        <h2>
                            Balances
                        </h2>
                        <div>
                            {props.tokens.map((token: any, index: any) => {
                                return <div className={"token-list"} style={{width: "100%"}}>
                                    <p>{token.token}</p>
                                    <p>
                                        {formatNumber(props.balances[token.token])}
                                    </p>
                                </div>
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>
                            Oracle
                        </h2>
                        <div>
                            <OraclePrices tokens={props.tokens}/>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    paddingTop: "1.5rem"
                }}>
                    <div style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                        <h2>
                            Bridge Tokens
                        </h2>
                        <div>
                            <BridgeModal title={"To Subnet"} tokens={props.tokens} balances={props.balances}/>
                        </div>
                    </div>
                    <div style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                        <h2>
                            Test Tokens Faucet
                        </h2>
                        <div>
                            <button className={"primary-btn"}>Get Tokens</button>
                        </div>
                    </div>
                    <div style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                        <h2>
                            Fuji AVAX Facuet
                        </h2>
                        {/*Facuet*/}
                        <div>
                            <button className={"primary-btn"}>Open Faucet</button>
                        </div>
                    </div>
                </div>


                {/*<h2>*/}
                {/*    Available Baskets*/}
                {/*</h2>*/}
                {/*<div className={"basket-list-header"}>*/}
                {/*    <p style={{textAlign: "left"}}>*/}
                {/*        Name*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        Balance*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        Value*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        NAV*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        Supply*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        Market Price*/}
                {/*    </p>*/}
                {/*    <p>*/}
                {/*        Index Price*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {props.baskets.map((basket: any, index: any) => {*/}
                {/*        return <CollapsibleBasketData basket={basket} key={basket.name}/>*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        }


    </div>
}
