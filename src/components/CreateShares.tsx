import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";
import {formatNumber} from "../helpers/util";
import TokenRequirements from "./TokenRequirements";

export default function CreateShares(props: any) {
    const web3Context = useContext(Web3Context);
    const [sharesToCreate, setSharesToCreate] = useState(0);
    const [submitText, setSubmitText] = useState("Enter Amount");
    const [weights, setWeights] = useState<{[key: string]: number}>({});

    const handleSubmit = (event: any) => {

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

        // @ts-ignore
        setSharesToCreate(value || sharesToCreate)
    }

    useEffect(() => {
        console.log(web3Context)
    }, [web3Context])
    return (
        <div style={{padding: "3rem", textAlign: 'center', color: '#d9d9d9'}}>
            <form onSubmit={handleSubmit}>
                <label>
                        <input className={"exposure-input"} type="text" value={sharesToCreate} onChange={handleChange} />
                </label>
            </form>
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
               <TokenRequirements portions={props.portions} amount={sharesToCreate} prices={props.prices} weights={weights} title={"Token Requirements"}/>
            </div>
            <div style={{paddingTop: "1.5rem"}}>
                {sharesToCreate > 0 ?
                    <button className={"primary-btn"}>Create</button>
                    :
                    <button disabled={true} style={{cursor: "not-allowed"}} className={"primary-btn"}>Enter Amount</button>

                }
            </div>
        </div>
    );
}
