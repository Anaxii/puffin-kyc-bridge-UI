// @ts-ignore
import Modal from 'react-modal';
import {useState} from "react";
import BridgeToSubnet from "./BridgeToSubnet";
import BridgeToMainnet from "./BridgeToMainnet";
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)"

    },
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '20%',
        minHeight: "30%",
        padding: 0,
        borderColor: "transparent",
        transform: 'translate(-50%, -50%)',
        backgroundColor: "#282C34"
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function BasketModal(props: any) {
    let subtitle: HTMLHeadingElement | null;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("To Subnet");

    function openModal() {
        setSelectedOption(props.title)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function changeOption(option: string) {
        setSelectedOption(option)
    }

    return (
        <div>
            <button className={"primary-btn"} onClick={openModal}>{props.title}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Basket Modal"
            >
                <div className={"modal-options"}>
                    <div onClick={() => {
                        changeOption("To Subnet")
                    }}
                         style={{
                             backgroundColor: selectedOption !== "To Mainnet" ? '#282C34' : '',
                             borderTop: selectedOption !== "To Mainnet" ? '2px solid white' : ''
                         }} className={"modal-options-title"}>
                        Bridge To Subnet
                    </div>
                    <div onClick={() => {
                        changeOption("To Mainnet")
                    }}
                         style={{
                             backgroundColor: selectedOption !== "To Subnet" ? '#282C34' : '',
                             borderTop: selectedOption !== "To Subnet" ? '2px solid white' : ''
                         }}
                         className={"modal-options-title"}>
                        Bridge To Mainnet
                    </div>
                </div>
                {
                    selectedOption === "To Subnet"
                        ?
                        <BridgeToSubnet tokens={props.tokens} balances={props.balances}/>
                        :
                        <BridgeToMainnet tokens={props.tokens} balances={props.balances}/>
                }
            </Modal>
        </div>
    );
}
