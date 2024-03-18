import React, { useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap';

export const RemoveModal = ({    
    showRemoveModal, 
    handleRemoveClose, 
    handleRemoveChannelSubmit, 
}) => {
    return (
        <Modal 
        show={showRemoveModal} 
        onHide={handleRemoveClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleRemoveChannelSubmit}>
                Уверены?

                <div className="d-flex justify-content-end">
                    <Button className="me-2" variant="secondary" onClick={handleRemoveClose}>
                        Отменить
                    </Button>
                    <Button variant="danger" type="submit">
                        Удалить
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    )
}