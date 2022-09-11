import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";
import {formatNumber} from "../helpers/util";
import TokenRequirements from "./TokenRequirements";
import IERC20ABI from "../constants/abi/erc20.json";
import {toast} from "react-toastify";
import ExposureBasketABI from "../constants/abi/exposure.json"

export default function CreateShares(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [sharesToCreate, setSharesToCreate] = useState(0);
    const [maxShares, setMaxShares] = useState(Number.MAX_VALUE);
    const [weights, setWeights] = useState<{ [key: string]: number }>({});
    const [allowances, setAllowances] = useState({});
    const [toApprove, setToApprove] = useState([]);

    const handleSubmit = async (event: any) => {
        if (toApprove.length > 0) {
            for (const i in toApprove) {
                await approve(toApprove[i])
            }
            return
        }
        let contract = new web3Context.web3.eth.Contract(ExposureBasketABI, props.basket.basketContractAddress)

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                console.log(sharesToCreate)
                await contract.methods.mint(BigInt(sharesToCreate) * BigInt(10**18), web3Context.account).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    return
                })
            } catch {
                reject()
            }
            ok()
        })
        await toast.promise(
            _approveToast,
            {
                pending: 'Awaiting transaction confirmation',
                success: 'Transaction confirmed',
                error: 'Transaction rejected'
            }
        ).then(() => {
            web3Context.refreshData()
            getAllowance()
            getToApprove(sharesToCreate)
        })
    }

    const approve = async (_toApprove: any) => {
        let contract = new web3Context.web3.eth.Contract(IERC20ABI, _toApprove.address)

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                await contract.methods.approve(props.basket.basketContractAddress, _toApprove.amount).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    return
                })
            } catch {
                reject()
            }
            ok()
        })
        await toast.promise(
            _approveToast,
            {
                pending: 'Awaiting transaction confirmation',
                success: 'Transaction confirmed',
                error: 'Transaction rejected'
            }
        ).then(() => {
            getAllowance()
            getToApprove(sharesToCreate)
        })
    }

    const getToApprove = (value: number) => {
        let _tokenAddress: any = {}
        for (const i in props.basket.tokens) {
            // @ts-ignore
            _tokenAddress[props.basket.tokens[i].token] = props.basket.tokens[i].tokenAddress
        }

        let _toApprove = []
        for (const i in allowances) {
            console.log(props.portions[i] * value)
            let _amount = (BigInt(Math.round(value * (10**8))) * BigInt(10**10)) * (BigInt(Math.round(props.portions[i] * (10 ** 8)) ) * ( BigInt(10**10))) / BigInt(10**18)
            // @ts-ignore
            if (_amount > allowances[i]) {
                _toApprove.push({
                    token: i, amount: _amount, address: _tokenAddress[i]
                })
            }
        }
        console.log(_toApprove)
        // @ts-ignore
        setToApprove(_toApprove)
    }

    const handleChange = (event: any) => {
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
        if (value > maxShares)
            value = Math.round(maxShares * 100000) / 100000
        if (value > props.basketCap)
            value = props.basketCap

        getToApprove(value)
        // @ts-ignore
        setSharesToCreate(value || 0)
    }

    const getAllowance = async () => {
        let _allowances: any = {}
        for (const i in props.basket.tokens) {
            let contract = new web3Context.web3.eth.Contract(IERC20ABI, props.basket.tokens[i].tokenAddress)
            let _allowance = await contract.methods.allowance(web3Context.account, props.basket.basketContractAddress).call()
            _allowances[props.basket.tokens[i].token] = BigInt(_allowance)
        }
        console.log(_allowances)
        setAllowances(_allowances)
    }

    const getMax = () => {
        getAllowance()
        let max = Number.MAX_VALUE
        Object.keys(props.portions).map((asset: string) => {
            if (web3Context.balances[asset] / props.portions[asset] < max)
                max = web3Context.balances[asset] / props.portions[asset]

        })
        setMaxShares(max)
    }

    const setMax = () => {
        setSharesToCreate(Math.round(maxShares * 100000) / 100000)
        getToApprove(Math.round(maxShares * 100000) / 100000)

    }

    useEffect(() => {
        getMax()
    }, [web3Context])

    return (
        <div style={{padding: "3rem", textAlign: 'center', color: '#d9d9d9'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className={"exposure-input"} type="text" value={sharesToCreate} onChange={handleChange}/>
                </label>

            </form>
            <button onClick={setMax} className={"max-btn"}>Max</button>

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
                    {formatNumber((props.balance + (Number(sharesToCreate) || 0)) || 0)} {props.basket.symbol}
                </p>
            </div>
            <div style={{paddingTop: "1rem"}}>
                <TokenRequirements portions={props.portions} amount={sharesToCreate} prices={props.prices}
                                   weights={weights} title={"Token Requirements"}/>
            </div>
            <div>
                <TokenRequirements portions={allowances} amount={sharesToCreate} prices={props.prices} weights={weights}
                                   title={"Token Allowances"}/>
            </div>
            <div style={{paddingTop: "1.5rem"}}>
                {sharesToCreate > 0 ?
                    <div>
                        {toApprove.length > 0 ?
                            <button className={"primary-btn"} onClick={handleSubmit}>Approve {toApprove.length}</button>
                        :
                            <button className={"primary-btn"} onClick={handleSubmit}>Create</button>

                        }
                    </div>
                    :
                    <button disabled={true} style={{cursor: "not-allowed"}} className={"primary-btn"}>Enter
                        Amount</button>

                }
            </div>
        </div>
    );
}
