import React, { Component } from "react";
import ModalWindow from "./ModalWindow";

export default class Modal extends Component {
    state = { showModal: false };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    componentDidMount(prevProps, prevState) {
        if (prevProps.showModal !== this.props.showModal) {
            this.setState({ showModal: this.props.showModal });
        }
    };

    render() {
        const { openButtonText, closeButtonText, children } = this.props;
        const { showModal } = this.state;

        return (
            <div>
                <button type="button" onClick={this.closeModal}>{openButtonText}</button>
                {
                    showModal &&
                    <ModalWindow onClose={this.closeModal}>
                        {children}
                        <button type="button" onClick={this.closeModal}>{closeButtonText}</button>
                    </ModalWindow>
                }
            </div>
        );
    };
};

