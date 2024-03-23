import React from "react";
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const RemoveModal = ({    
    showRemoveModal, 
    handleRemoveClose, 
    handleRemoveChannelSubmit, 
}) => {
    const { t } = useTranslation();

    return (
        <Modal 
        show={showRemoveModal} 
        onHide={handleRemoveClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>{t('modals.removeModal.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleRemoveChannelSubmit}>
                {t('modals.removeModal.areYouSure')}

                <div className="d-flex justify-content-end">
                    <Button className="me-2" variant="secondary" onClick={handleRemoveClose}>
                        {t('modals.buttons.cancel')}
                    </Button>
                    <Button variant="danger" type="submit">
                        {t('modals.buttons.remove')}
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    )
}