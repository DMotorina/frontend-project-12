import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import filter from 'leo-profanity';

import useApi from '../../hooks/useApi.js';
import notification from '../toast/index.js';
import { channelsSelectors, changeChannel } from '../../slices/channelsSlice.js';

const AddModal = ({ isOpen, close }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map((channel) => channel.name);

  const dispatch = useDispatch();
  const api = useApi();

  const { t } = useTranslation();

  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required()
      .min(3, t('errors.username'))
      .max(20, t('errors.username'))
      .notOneOf(channelsName, t('errors.channelName')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      const channel = { name: filter.clean(name) };

      try {
        const data = await api.createChannel(channel);
        dispatch(changeChannel(data));
        notification.successToast(t('toast.channelAdd'));
        close();
      } catch (err) {
        notification.errorNotify(t('errors.network'));
      }
    },
  });

  return (
    <Modal centered show={isOpen}>
      <Modal.Header closeButton onHide={close}>
        <Modal.Title>{t('modals.addModal.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Floating className="mb-3">
            <Form.Control
              name="name"
              id="name"
              required
              type="text"
              placeholder={t('modals.renameModal.nameOfChannel')}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
              ref={inputElem}
            />
            <label htmlFor="name">{t('modals.renameModal.nameOfChannel')}</label>
            <div className="invalid-tooltip">{formik.errors.name}</div>
          </Form.Floating>

          <div className="d-flex justify-content-end mt-3">
            <Button
              className="btn-secondary mt-2 me-2"
              onClick={close}
              type="button"
            >
              {t('modals.buttons.cancel')}
            </Button>
            <Button
              className="btn-primary mt-2"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.buttons.send')}
            </Button>
          </div>

        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default AddModal;
