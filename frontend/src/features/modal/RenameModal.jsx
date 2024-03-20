import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';

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
    const formik = useFormik({
        initialValues: {
            name: activeChannel.name,
        },
        onSubmit: async (values) => {
          try {
            await axios.patch(`/api/v1/channels/${activeChannel.id}`, values, { headers: { Authorization: `Bearer ${token}` } });
            socket.emit('renameChannel');
            handleRenameClose();
          } catch (err) {
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
            <Modal.Title>Переименовать канал</Modal.Title>
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