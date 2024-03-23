import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';


import {updateChannel} from '../../slices/channelsSlice'

import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io();

export const RenameModal = ({ 
    token,
    activeChannel,   
    showRenameModal, 
    handleRenameClose, 
}) => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: activeChannel.name,
        },
        onSubmit: async (values) => {
            const editedChannel = {name: leoProfanity.clean(values.name)}

          try {
            await axios.patch(`/api/v1/channels/${activeChannel.id}`, editedChannel, { headers: { Authorization: `Bearer ${token}` } });
            socket.emit('renameChannel');
            handleRenameClose();
            toast.success(t('toast.renamedChannel'));
          } catch (err) {
            toast.error(t('toast.dataLoadingError'));
            console.log(err);
          }
        },
     });


    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('renameChannel', (payload) => {
        const channelId = payload.id;
        const newName = payload.name;

        dispatch(updateChannel({ id: channelId, changes: { name: newName } }));
        });
    }, [dispatch]);
    
    return (
        <Modal 
            show={showRenameModal} 
            onHide={handleRenameClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.renameModal.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                    <Form.Control
                        required
                        data-testid="input-body"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    </Form.Group>
                    <Form.Label 
                        visuallyHidden 
                        htmlFor="name"
                    >
                        {t('modals.renameModal.nameOfChannel')}
                    </Form.Label>
                    <div className="d-flex justify-content-end">
                    <Button 
                        onClick={handleRenameClose} 
                        type="button" 
                        className="btn-secondary mt-2 me-2"
                    >
                        {t('modals.buttons.cancel')}
                    </Button>
                    <Button 
                        type="submit" 
                        className="btn-primary mt-2"
                    >
                        {t('modals.buttons.rename')}
                    </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}