// @ts-ignore
import Modal from 'react-modal';
import {useState} from "react";
import RedeemShares from "./RedeemShares";
import CreateShares from "./CreateShares";

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
    const [selectedOption, setSelectedOption] = useState("Create Shares");

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
                        changeOption("Create Shares")
                    }}
                         style={{
                             backgroundColor: selectedOption !== "Redeem Shares" ? '#282C34' : '',
                             borderTop: selectedOption !== "Redeem Shares" ? '2px solid white' : ''
                         }} className={"modal-options-title"}>
                        Create Shares
                    </div>
                    <div onClick={() => {
                        changeOption("Redeem Shares")
                    }}
                         style={{
                             backgroundColor: selectedOption !== "Create Shares" ? '#282C34' : '',
                             borderTop: selectedOption !== "Create Shares" ? '2px solid white' : ''
                         }}
                         className={"modal-options-title"}>
                        Redeem Shares
                    </div>
                </div>
                {
                    selectedOption === "Redeem Shares"
                        ?
                        <RedeemShares basket={props.basket} closeModal={closeModal} balance={props.balance} portions={props.portions} prices={props.prices} weights={props.weights}/>
                        :
                        <CreateShares basket={props.basket} closeModal={closeModal} balance={props.balance} portions={props.portions} prices={props.prices} weights={props.weights}/>
                }
            </Modal>
        </div>
    );
}
