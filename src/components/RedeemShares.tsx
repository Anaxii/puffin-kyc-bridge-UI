import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";
import {formatNumber} from "../helpers/util";
import TokenRequirements from "./TokenRequirements";
import IERC20ABI from "../constants/abi/erc20.json"
import ExposureBasketABI from "../constants/abi/exposure.json"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function RedeemShares(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [sharesToCreate, setSharesToCreate] = useState(0);
    const [weights, setWeights] = useState<{[key: string]: number}>({});
    const [allowance, setAllowance] = useState(BigInt(0));
    const [redeemMessage, setRedeemMessage] = useState("Redeem");

    const handleSubmit = (event: any) => {
        if ((BigInt(sharesToCreate) * BigInt(10**18)) > allowance) {
            approve()
        } else {
            create()
        }
    }

    const approve = async () => {
        let contract = new web3Context.web3.eth.Contract(IERC20ABI, props.basket.basketContractAddress)

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                await contract.methods.approve(props.basket.basketContractAddress, (BigInt(sharesToCreate) * BigInt(10**18))).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    return
                })
            } catch {
                reject()
            }
            ok()
        })
        toast.promise(
            _approveToast,
            {
                pending: 'Awaiting transaction confirmation',
                success: 'Transaction confirmed',
                error: 'Transaction rejected'
            }
        ).then(() => {
            setRedeemMessage("Redeem")
            getAllowance()
        })
    }

    const create = async () => {
        let contract = new web3Context.web3.eth.Contract(ExposureBasketABI, props.basket.basketContractAddress)

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                await contract.methods.burn((BigInt(sharesToCreate) * BigInt(10**18)), web3Context.account).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    return
                })
            } catch {
                reject()
            }
            ok()
        })
        toast.promise(
            _approveToast,
            {
                pending: 'Awaiting transaction confirmation',
                success: 'Transaction confirmed',
                error: 'Transaction rejected'
            }
        ).then(() => {
            setRedeemMessage("Redeem")
            getAllowance()
        })
    }

    const getAllowance = async () => {
        console.log(props, web3Context)
        let contract = new web3Context.web3.eth.Contract(IERC20ABI, props.basket.basketContractAddress)
        let _allowance = await contract.methods.allowance(web3Context.account, props.basket.basketContractAddress).call()
        setAllowance(BigInt(_allowance))
        console.log(_allowance)
    }

    useEffect(() => {
        getAllowance()
    }, [])

    const setMax = () => {
        if ((BigInt(props.balance) * BigInt(10**18)) > allowance) {
            setRedeemMessage("Approve")
        } else {
            setRedeemMessage("Redeem")
        }
        setSharesToCreate(props.balance)
    }

    const handleChange = (event: any) => {
        console.log(props)
        if (event.target.value == ".")
            event.target.value = "0."

        if (event.target.value == "") {
            // @ts-ignore
            setSharesToCreate("")
            return
        }

        let value: number = Number(event.target.value)
        if (value < 0)
            value = 0

        if (value > props.balance)
            value = props.balance

        if ((BigInt(value) * BigInt(10**18)) > allowance) {
            setRedeemMessage("Approve")
        } else {
            setRedeemMessage("Redeem")
        }

        // @ts-ignore
        setSharesToCreate(value || sharesToCreate)
    }

    return (
        <div style={{padding: "3rem", textAlign: 'center', color: '#d9d9d9'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className={"exposure-input"} type="text" value={sharesToCreate} onChange={handleChange} />
                </label>
            </form>
            <button onClick={setMax} className={"max-btn"} >Max</button>

            <div className={"modal-options-small"} style={{paddingTop: "1.5rem"}}>
                <p style={{textAlign: "left"}}>
                    Balance Before
                </p>
                <p style={{textAlign: "right"}}>
                    {formatNumber(props.balance || 0)} {props.basket.symbol}
                </p>
            </div>
            <div className={"modal-options-small"}>
                <p style={{textAlign: "left"}}>
                    Balance After
                </p>
                <p style={{textAlign: "right"}}>
                    {formatNumber((props.balance - (Number(sharesToCreate) || 0)) || 0)} {props.basket.symbol}
                </p>
            </div>
            <div style={{paddingTop: "1rem"}}>
                <TokenRequirements portions={props.portions} amount={sharesToCreate} prices={props.prices} weights={weights} title={"Tokens Received"}/>
            </div>
            <div style={{paddingTop: "1.5rem"}}>
                {sharesToCreate > 0 ?
                    <button onClick={handleSubmit} className={"primary-btn"}>{redeemMessage}</button>
                    :
                    <button disabled={true} style={{cursor: "not-allowed"}} className={"primary-btn"}>Enter Amount</button>

                }
            </div>
        </div>
    );
}
