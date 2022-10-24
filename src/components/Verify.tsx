import {useContext, useEffect, useState} from "react";
import {Web3Context} from "../helpers/context";

import 'react-dropdown/style.css';
import Web3 from "web3";

export default function Verify(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isValidating, setIsValidating] = useState(false);


    const validateEmail = (_email: string) => {
        return String(_email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    async function sign() {
        if (!validateEmail(email)) {
            setIsValid(false)
            return
        }
        setIsValid(true)
        if (!window.ethereum)
            return

        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        const message = email;
        const hashedMessage = Web3.utils.sha3(message);

        const signature = await window.ethereum.request({
            method: "personal_sign",
            params: [hashedMessage, accounts[0]],
        });

        const r = signature.slice(0, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({hashedMessage, account: accounts[0], message, r, s, v})
        };
        fetch('http://localhost:8080/verify', requestOptions)
            .then(response => response.json())
            .then(data => {
                setIsValidating(data.status)
            });
    }

    const handleChange = async (event: any) => {
        if (event.target.value == ".")
            event.target.value = "0."

        setEmail(event.target.value)
    }

    return (
        <div style={{padding: "3rem", textAlign: 'center', color: '#d9d9d9'}}>
            <form onSubmit={sign}>
                <label>
                    <input className={"exposure-input"} type="text" placeholder={"Email"} value={email}
                           onChange={handleChange}/>
                </label>
            </form>
            <div style={{paddingTop: "1.5rem", paddingBottom: "1rem"}}>
                <div>
                    {!isValidating && <button className={"primary-btn"} onClick={sign}>Verify Account</button>}
                </div>
                {!isValid && <p style={{color: "red"}}>Invalid email</p>}
                {isValidating && <p>Please wait a few minutes while your account is approved</p>}
            </div>
            <p><a style={{color: "white", textAlign: "center"}} href={"https://faucet.avax.network/"} target={"_blank"}>Get
                AVAX on Fuji</a></p>
        </div>
    );
}
