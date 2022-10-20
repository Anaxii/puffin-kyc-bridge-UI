import CollapsibleBasketData from "./CollapsibleBasketData";
import {formatNumber} from "../helpers/util";
import BasketModal from "./BasketModal";

export default function DApp(props: any) {

    return <div className={"dapp"}>
        <h2>
            Balances
        </h2>
        <div>
            {props.tokens.map((token: any, index: any) => {
                return <div className={"token-list"} style={{width: "50%"}}>
                    <p >{token.token}</p>
                    <p>
                        {formatNumber(props.balances[token.token])}
                    </p>
                </div>
               })}
        </div>
        <h2>
            Bridge
        </h2>
        <div>
            <h3>
                Bridge to Subnet
            </h3>
            <div>
                <BasketModal title={"To Subnet"} tokens={props.tokens} balances={props.balances}/>

            </div>
            <h3>
                Bridge to Mainnet
            </h3>
            <div>
                <BasketModal title={"To Mainnet"} tokens={props.tokens} balances={props.balances}/>

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
