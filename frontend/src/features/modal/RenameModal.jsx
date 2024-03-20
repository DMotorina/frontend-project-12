import React, { useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap';

export const RenameModal = ({    
    showRenameModal, 
    handleRenameClose, 
}) => {
    return (
        <Modal 
        show={showRenameModal} 
        onHide={handleRenameClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Control
                    required
                    data-testid="input-body"
                    name="name"
                />
                </Form.Group>
                <Form.Label visuallyHidden htmlFor="name">Имя канала</Form.Label>
                <div className="d-flex justify-content-end">
                <Button onClick={handleRenameClose} type="button" className="btn-secondary mt-2 me-2">Отменить</Button>
                <Button type="submit" className="btn-primary mt-2">Отправить</Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    )
}