import React, { useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap';


export const AddModal = ({
    showAddModal, 
    handleClose, 
    handleChannelSubmit, 
    inputChannel, 
    handleChangeInputChannel
}) => {
    return (
        <Modal 
        show={showAddModal} 
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleChannelSubmit}>
                <Form.Control
                    name="name"
                    id="name"
                    type="text"
                    className="mb-2 form-control"
                    value={inputChannel}
                    onChange={handleChangeInputChannel}
                />
                <div className="d-flex justify-content-end">
                    <Button className="me-2" variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="primary" type="submit">
                        Отправить
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    )
}