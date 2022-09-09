import {useContext} from "react";
import {Web3Context} from "../helpers/context";

export default function Navigation(props: any) {
    const web3Context: any = useContext(Web3Context);

    return <div className={'navigation'}>
        <h2 className={"exposure-title"}>
            Exposure v1
        </h2>
        <div className={"color-primary"} style={{margin: "auto"}}>
            <p>{web3Context.account}</p>
        </div>
        <div style={{marginLeft: "auto", margin: "auto", marginRight: "0"}}>
            <button style={{verticalAlign: "middle"}} className={"primary-btn"} onClick={() => props.disconnect()}>Disconnect</button>
        </div>
    </div>
}
