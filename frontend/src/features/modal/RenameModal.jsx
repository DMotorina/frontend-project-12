import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { channelsSelectors } from '../../slices/channelsSlice';

import useApi from '../../hooks/useApi';

import notification from '../toast/index';

const RenameModal = ({ isOpen, close }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map((channel) => channel.name);
  const { activeChannelId } = useSelector((state) => state.channels);
  const { name } = useSelector((state) => channelsSelectors.selectById(state, activeChannelId));

  const api = useApi();
  const { t } = useTranslation();

  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.select();
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
      name,
    },
    onSubmit: async (values) => {
      try {
        await api.renameChannel(activeChannelId, values);
        notification.successToast(t('toast.renamedChannel'));
        close();
      } catch (err) {
        notification.errorNotify(t('errors.network'));
      }
    },
  });

  return (
    <Modal centered show={isOpen}>
      <Modal.Header closeButton onHide={close}>
        <Modal.Title>{t('modals.renameModal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Floating className="mb-3">
            <Form.Control
              name="name"
              id="name"
              required
              type="text"
              data-testid="input-body"
              placeholder={t('modals.renameModal.nameOfChannel')}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
              ref={inputElem}
            />
            <label htmlFor="name">{t('modals.renameModal.nameOfChannel')}</label>
            <div className="invalid-tooltip">{formik.errors.name}</div>
          </Form.Floating>

          <div className="d-flex justify-content-end">
            <Button
              className="btn-secondary mt-2 me-2"
              type="button"
              onClick={close}
            >
              {t('modals.buttons.cancel')}
            </Button>
            <Button
              className="btn-primary mt-2"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.buttons.rename')}
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
