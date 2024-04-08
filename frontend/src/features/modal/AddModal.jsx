import React from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

const validationChannelsSchema = (channels, text) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(text('required'))
    .min(3, text('min'))
    .max(20, text('max'))
    .notOneOf(channels, text('duplicate')),
});

const socket = io();

const AddModal = ({
  token,
  showAddModal,
  handleClose,
}) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const channelsName = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: async (values) => {
      const { name } = values;
      const newChannel = { name: leoProfanity.clean(name) };

      try {
        await axios.post('/api/v1/channels', newChannel, { headers: { Authorization: `Bearer ${token}` } });
        socket.emit('newChannel', { newChannel });
        toast.success(t('toast.createChannel'));
        handleClose();
      } catch (error) {
        toast.error(t('toast.dataLoadingError'));
      }
    },
  });

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
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            name="name"
            id="name"
            type="text"
            className="mb-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={!!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid" tooltip>{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>
              {t('modals.buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
              {t('modals.buttons.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
