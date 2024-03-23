import React from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const AddModal = ({
    showAddModal, 
    handleClose, 
    handleChannelSubmit, 
    inputChannel, 
    handleChangeInputChannel
}) => {
    const { t } = useTranslation();

    return (
        <Modal 
        show={showAddModal} 
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>{t('modals.addModal.addChannel')}</Modal.Title>
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
                        {t('modals.buttons.cancel')}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t('modals.buttons.send')}
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    )
}