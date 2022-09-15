import useCollapse from 'react-collapsed';
import {PieChart} from 'react-minimal-pie-chart';
import {useEffect, useState, ComponentProps, useContext} from "react";
import ReactTooltip from 'react-tooltip';
import {rainbow} from "../helpers/util";
import BasketModal from "./BasketModal";
import {Web3Context} from "../helpers/context";
import {formatNumber} from "../helpers/util";

type Props = {
    data: ComponentProps<typeof PieChart>['data'];
};

function makeTooltipContent(entry: Props['data'][0]) {
    return `${entry.tooltip}: ${entry.value}%`;
}

export default function CollapsibleBasketData(props: any) {
    const web3Context: any = useContext(Web3Context);

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
    const [weights, setWeights] = useState([])
    const [hovered, setHovered] = useState<number | null>(null);

    const [portions, setPortions] = useState({})
    const [stats, setStats] = useState({
        rebalanceTime: 0
    })

    const [balance, setBalance] = useState(0)
    const [basketCap, setBasketCap] = useState(props.basket.basketCap)

    const [prices, setPrices] = useState({ })


    const getBasketInfo = async () => {
        let _exposureInfo

         _exposureInfo = web3Context.exposureInfo
        let _portions = await _exposureInfo.getPortions()
        setPortions(_portions)
        let _stats = await _exposureInfo.getBasketStats(props.basket)
        setStats(_stats)
        let _prices = await _exposureInfo.getPricesAndMcaps()
        setBasketCap(Number(BigInt(_stats.basketCap) / BigInt(10**10)) / (10**8))
        setPrices(_prices)

        let totalWeight = 0
        let _weights: any = {}

        Object.keys(_portions).map((asset: any) => {
            totalWeight += _portions[asset] * _prices.prices[asset]
        })
        Object.keys(_portions).map((asset: any) => {
            _weights[asset] = _portions[asset] * _prices.prices[asset] / totalWeight * 100
        })
        setWeights(_weights)
    }

    useEffect(() => {
        console.log("refreshing", props.basket.name)
        console.log(props)
        setBalance(web3Context.balances[props.basket.name])
        getBasketInfo()
    }, [web3Context.balances])

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
        console.log(props)
        setWeights(_weights)
        getBasketInfo()
    }, [web3Context.web3])

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
                    {formatNumber(props.basket.supply)}/{formatNumber(basketCap)}
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
                        <div className={"modal-options"} style={{width: "100%", paddingBottom: "1rem"}}>
                            <p style={{textAlign: "left"}}>
                                User Fee Tier:
                            </p>
                            <p style={{textAlign: "right"}}>
                                Default
                            </p>
                            <p style={{textAlign: "left"}}>
                                Mint Fee:
                            </p>
                            <p style={{textAlign: "right"}}>
                                {props.basket.mintFee}%
                            </p>
                            <p style={{textAlign: "left"}}>
                                Burn Fee:
                            </p>
                            <p style={{textAlign: "right"}}>
                                {props.basket.redeemFee}%
                            </p>
                            <p style={{textAlign: "left"}}>
                                Next Rebalance:
                            </p>
                            <p style={{textAlign: "right"}}>
                                {stats.rebalanceTime}
                            </p>
                            <p style={{textAlign: "left"}}>
                                Holders:
                            </p>
                            <p style={{textAlign: "right"}}>
                                {formatNumber(props.basket.marketPrice)}
                            </p>
                            <p style={{textAlign: "left"}}>
                                Liquidity:
                            </p>
                            <p style={{textAlign: "right"}}>
                                ${formatNumber(props.basket.liquidity)}
                            </p>
                        </div>
                    </div>
                    <div style={{margin: "auto"}}>
                        <a href={props.basket.dexAddress} target={"_blank"}>
                            <button className={"primary-btn"}>
                                Trade
                            </button>
                        </a>

                    </div>
                    <div style={{margin: "auto"}}>
                        <BasketModal title={"Create Shares"} basket={props.basket} portions={portions} balance={balance} prices={prices} weights={weights} basketCap={basketCap}/>
                    </div>
                    <div style={{margin: "auto"}}>
                        <BasketModal title={"Redeem Shares"} basket={props.basket} portions={portions} balance={balance} prices={prices} weights={weights}/>
                    </div>
                    {/*<div style={{width: "50%", marginLeft: "auto", marginRight: "auto", padding: "5%"}} data-tip=""*/}
                    {/*     data-for="chart">*/}
                    {/*    <p style={{textAlign: "center"}}>*/}
                    {/*        Asset Weights*/}
                    {/*    </p>*/}
                    {/*    <PieChart*/}
                    {/*        data={weights}*/}
                    {/*        labelStyle={{*/}
                    {/*            fill: 'black',*/}
                    {/*            fontSize: '5px'*/}
                    {/*        }}*/}
                    {/*        onMouseOver={(_, index) => {*/}
                    {/*            setHovered(index);*/}
                    {/*        }}*/}
                    {/*        onMouseOut={() => {*/}
                    {/*            setHovered(null);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*    <ReactTooltip*/}
                    {/*        id="chart"*/}
                    {/*        getContent={() =>*/}
                    {/*            typeof hovered === 'number' ? makeTooltipContent(weights[hovered]) : null*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
