import useCollapse from 'react-collapsed';
import {ComponentProps, useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";
import {formatNumber} from "../helpers/util";

export default function TokenRequirements(props: any) {
    const web3Context: any = useContext(Web3Context);

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();



    return (
        <div className="collapsible">
            <div className={"token-requirement-list"} {...getToggleProps()}  >
                <p style={{fontSize: "14px", color: "white"}} className={"hover-underline"}>
                    {props.title} &#8595;
                </p>
            </div>
            <div {...getCollapseProps()}>
                <div className="content-token" style={{margin: 0}}>
                    <div className={"modal-options"} style={{width: "100%"}}>
                        <p style={{textAlign: "left", fontSize: "12px", color: "#ababab"}}>
                            Asset Name
                        </p>
                        <p style={{textAlign: "right", fontSize: "12px", color: "#ababab"}}>
                            Requirement
                        </p>
                    </div>
                    {Object.keys(props.portions).map((asset: string) => {
                        return (
                            <div className={"modal-options-small"} style={{width: "100%"}}>

                                {asset.length > 15 ?
                                    <p style={{textAlign: "left"}}>
                                        {asset.substring(0, 15)}...
                                    </p>
                                    :
                                    <p style={{textAlign: "left"}}>
                                        {asset}
                                    </p>
                                }
                                <p style={{textAlign: "right"}}>
                                    {(props.portions[asset] * props.amount).toLocaleString(undefined, {maximumFractionDigits: 6, minimumFractionDigits: 6})}
                                </p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
