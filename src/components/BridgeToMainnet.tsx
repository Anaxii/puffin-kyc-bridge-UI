import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";

import IERC20ABI from "../constants/abi/erc20.json";
import {toast} from "react-toastify";
import ExposureSubnetBridgeABI from "../constants/abi/SubnetBridge.json"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function BridgeToMainnet(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [sharesToCreate, setSharesToCreate] = useState(0);
    const [maxShares, setMaxShares] = useState(0);
    const [allowance, setAllowance] = useState(BigInt(0));
    const [toApprove, setToApprove] = useState(false);
    const [subnetOptions, setSubnetOptions] = useState([]);
    const [selectedToken, setToken] = useState([]);

    const handleSubmit = async (event: any) => {
        console.log(selectedToken, toApprove, allowance, BigInt(Math.floor(sharesToCreate * (10**10))) * BigInt(10**8))
        if (toApprove) {
            await approve()
            return
        }
        let contract = new web3Context.web3.eth.Contract(ExposureSubnetBridgeABI, "0xA65951646e399292ef195090ebb2D56eb346d978")

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                let _address = await contract.methods.mainnetAddresses(selectedToken).call().catch((err: any) => console.log(err))
                await contract.methods.bridgeToMainnet(_address, BigInt(Math.floor(sharesToCreate * (10**10))) * BigInt(10**8)).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    return
                })
                setToApprove(false)
                await getAllowance(selectedToken)

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
        ).then(async () => {
            await web3Context.refreshData()
            setToApprove(false)
            await getAllowance(selectedToken)
        })
    }

    const approve = async () => {
        let contract = new web3Context.web3.eth.Contract(IERC20ABI, selectedToken)

        let _approveToast = new Promise(async (ok: any, reject: any) => {
            try {
                let f = true
                await contract.methods.approve("0xA65951646e399292ef195090ebb2D56eb346d978", BigInt(Math.floor(sharesToCreate * (10**10))) * BigInt(10**8)).send({from: web3Context.account}).catch((err: any) => {
                    reject()
                    f = false
                    return
                })
                if (f)
                    setToApprove(false)
                await getAllowance(selectedToken)

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
        ).then(async () => {
            setToApprove(false)
            await web3Context.refreshData()
            await getAllowance(selectedToken)
        })
    }

    const handleChange = async (event: any) => {
        if (event.target.value == ".")
            event.target.value = "0."

        if (event.target.value[event.target.value.length - 1] == ".") {
            setSharesToCreate(event.target.value)
            return
        }

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

        // @ts-ignore
        let _allowance = await getAllowance(selectedToken)
        if (BigInt(Math.floor(sharesToCreate * (10**10))) * BigInt(10**8) > BigInt(_allowance)) {
            setToApprove(true)
        } else {
            setToApprove(false)
        }
        setSharesToCreate(value || 0)
    }

    const getAllowance = async (val: any) => {
        let contract = new web3Context.web3.eth.Contract(IERC20ABI, val)
        let _allowance = await contract.methods.allowance(web3Context.account, "0xA65951646e399292ef195090ebb2D56eb346d978").call()
        setAllowance(_allowance)
        return _allowance
    }

    const setMax = async () => {
        setSharesToCreate(Math.round(maxShares * 100000) / 100000)
        let _allowance = await getAllowance(selectedToken)
        if (BigInt(Math.floor((Math.round(maxShares * 100000) / 100000) * (10**10))) * BigInt(10**8) > BigInt(_allowance)) {
            setToApprove(true)
        } else {
            setToApprove(false)
        }
    }

    const onSelect = async (e: any) => {
        setMaxShares(props.balances[e.label] | 0)
        setToken(e.value)
        await getAllowance(e.value)
        if (sharesToCreate != 0)
            handleChange({target: {value: sharesToCreate}})
    }

    useEffect(() => {
        if (sharesToCreate != 0)
            handleChange({target: {value: sharesToCreate}})

    }, [allowance])

    useEffect(() => {
        let _subnetOptions: any = []
        for (const i in props.tokens) {
            if (props.tokens[i].name.includes("Subnet")) {
                _subnetOptions.push({value: props.tokens[i].tokenAddress, label: props.tokens[i].token})
            }
        }
        setSubnetOptions(_subnetOptions)
    }, [props.tokens])

    useEffect(() => {
        if (selectedToken.length > 0) {
            getAllowance(selectedToken)
        } else if (subnetOptions.length > 0) {
            // @ts-ignore
            getAllowance(subnetOptions[0].value)
            onSelect(subnetOptions[0])
        }
    }, [web3Context, subnetOptions])

    return (
        <div style={{padding: "3rem", textAlign: 'center', color: '#d9d9d9'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className={"exposure-input"} type="text" value={sharesToCreate} onChange={handleChange}/>
                </label>

            </form>
            <button onClick={setMax} className={"max-btn"}>Max</button>
            <p style={{fontSize: "12px"}}>Bridge swap may take up to 5 minutes to complete</p>
            <Dropdown options={subnetOptions} onChange={onSelect} value={subnetOptions[0]} placeholder="Select Token" />
            <div style={{paddingTop: "1.5rem"}}>
                {sharesToCreate > 0 ?
                    <div>
                        {toApprove ?
                            <button className={"primary-btn"} onClick={handleSubmit}>Approve</button>
                        :
                            <button className={"primary-btn"} onClick={handleSubmit}>Bridge to Subnet</button>

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
