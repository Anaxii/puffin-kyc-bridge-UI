import CollapsibleBasketData from "./CollapsibleBasketData";

export default function DApp(props: any) {

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
                Market Price
            </p>
            <p>
                Index Price
            </p>
        </div>
        <div>
            {props.baskets.map((basket: any, index: any) => {
                return <CollapsibleBasketData basket={basket} key={basket.name}/>
            })}
        </div>
    </div>
}
