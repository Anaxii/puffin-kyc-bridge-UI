import useCollapse from 'react-collapsed';
import {PieChart} from 'react-minimal-pie-chart';
import {useEffect, useState, ComponentProps} from "react";
import ReactTooltip from 'react-tooltip';
import {rainbow} from "../helpers/util";
import {ExposureInfo} from "../helpers/ExposureInfo";
import Web3 from "web3";
import BasketModal from "./BasketModal";

type Props = {
    data: ComponentProps<typeof PieChart>['data'];
};

function makeTooltipContent(entry: Props['data'][0]) {
    return `${entry.tooltip}: ${entry.value}%`;
}

export default function CollapsibleBasketData(props: any) {
    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
    const [weights, setWeights] = useState([])
    const [hovered, setHovered] = useState<number | null>(null);

    const [portions, setPortions] = useState({})
    const [balance, setBalance] = useState(0)

    const formatNumber = (num: number): string => {
        return num.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
    }

    const getBasketInfo = async () => {
        console.log(props)
        let _exposureInfo
        let account: string

         _exposureInfo = new ExposureInfo(props.provider, props.web3, "0x452cfC754A3889aaBD43Ec575bE62467859434B7" )
        let _account = await props.web3.eth.getAccounts()
        account = _account[0]

        setPortions(await _exposureInfo.getPortions())
        let bal = await _exposureInfo.getBalanceOfAddress(_exposureInfo.ExposureAddress, account)
        console.log(bal)
        setBalance(bal)
    }

    useEffect(() => {
        let _weights: any = []
        props.basket.tokens.map((token: any, index: number) => {
            _weights.push({
                title: token.token,
                value: token.weight * 100,
                color: rainbow(index, 1),
                tooltip: token.token
            })
        })
        setWeights(_weights)
        getBasketInfo()
        console.log(getToggleProps())
    }, [])

    useEffect(() => {

        console.log(getToggleProps())
    }, [getToggleProps])
    return (
        <div className="collapsible">
            <div className={"basket-list"} {...getToggleProps()} style={{backgroundColor: getToggleProps()["aria-expanded"] ? "#24272f" : ''}} id={props.basket.name}>
                <p style={{textAlign: "left"}}>
                    {props.basket.name}
                </p>
                <p>
                    {formatNumber(balance)}
                </p>
                <p>
                    ${formatNumber(balance * props.basket.indexPrice)}
                </p>
                <p>
                    ${formatNumber(props.basket.nav)}
                </p>
                <p>
                    {formatNumber(props.basket.supply)}/{props.basket.basketCap}
                </p>
                <p>
                    {props.basket.holders}
                </p>
                <p>
                    ${formatNumber(props.basket.marketPrice)}
                </p>
                <p>
                    ${formatNumber(props.basket.indexPrice)}
                </p>
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <div style={{margin: "auto"}}>
                        <p>
                        User Fee Tier: Default
                    </p>
                        <p>
                        User Average Entry
                    </p>
                        <p>
                            Mint Fee: 0.3%
                        </p>
                        <p>
                            APY: 0%
                        </p>
                        <p>
                            Next Rebalance Time
                        </p>
                        <p>
                            Next Rebalance Step
                        </p>
                        <p>
                            Sell to exposure
                        </p>
                        <p>
                            buy from exposure
                        </p>
                        <p>
                            Rebalance token mcap
                        </p>
                        <p>
                            Tokens to sell
                        </p>
                        <p>
                            Tokens sold
                        </p>
                        <p>
                            TOkens to buy
                        </p>
                        <p>
                            Tokens bought
                        </p>
                        <p>
                            USDC in asset manager
                        </p>
                        <p>
                            Holders chart
                        </p>
                        <p>
                            NAV chart
                        </p>
                        <p>
                            rebalance token price
                        </p>
                        <p>
                            Is rebalancing: false
                        </p>
                        <p>
                            Basket Cap
                        </p>
                        <p>
                            Mint Fee: 0.3%
                        </p>
                        <p>
                            Burn Fee: 0.3%
                        </p>
                        <p>
                            Quick Buy Fee: 0.3%
                        </p>
                        <p>
                            Quick Liquidate Fee: 0.3%
                        </p>
                        <p>
                            Liquidity: ${formatNumber(0)}
                        </p>
                        <p>
                            Mark Price: ${formatNumber(props.basket.marketPrice)}
                        </p>
                        <a href={props.basket.dexAddress} target={"_blank"}>
                            <button className={"primary-btn"}>
                                Trade
                            </button>
                        </a>

                    </div>
                    <div style={{margin: "auto"}}>
                        <p>
                            Index Price: ${formatNumber(props.basket.indexPrice)}
                        </p>
                        <p>
                            NAV Per Share: ${formatNumber(props.basket.navPerShare)}
                        </p>
                        <BasketModal title={"Create Shares"}/>
                    </div>
                    <div style={{margin: "auto"}}>
                        <p>
                            {formatNumber(props.basket.nav)}
                        </p>
                        <p>
                            NAV Per Share: ${formatNumber(props.basket.navPerShare)}
                        </p>
                        <BasketModal title={"Redeem Shares"}/>

                    </div>
                    <div style={{width: "50%", marginLeft: "auto", marginRight: "auto", padding: "5%"}} data-tip=""
                         data-for="chart">
                        <p style={{textAlign: "center"}}>
                            Asset Weights
                        </p>
                        <PieChart
                            data={weights}
                            labelStyle={{
                                fill: 'black',
                                fontSize: '5px'
                            }}
                            onMouseOver={(_, index) => {
                                setHovered(index);
                            }}
                            onMouseOut={() => {
                                setHovered(null);
                            }}
                        />
                        <ReactTooltip
                            id="chart"
                            getContent={() =>
                                typeof hovered === 'number' ? makeTooltipContent(weights[hovered]) : null
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
