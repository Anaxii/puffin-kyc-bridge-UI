// @ts-ignore
import Modal from 'react-modal';
import {useState} from "react";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)"

    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '20%',
        height: "30%",
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
                    <div onClick={() => {changeOption("Create Shares")}} className={"modal-options-title"}>
                        Create Shares
                    </div>
                    <div onClick={() => {changeOption("Redeem Shares")}} className={"modal-options-title"}>
                        Redeem Shares
                    </div>
                </div>
                <div style={{padding: "2rem"}}>
                    <h2>{selectedOption}</h2>
                    <button onClick={closeModal}>close</button>
                    <button onClick={() => {changeOption("Redeem Shares")}}>Redeem Shares</button>
                </div>
            </Modal>
        </div>
    );
}
