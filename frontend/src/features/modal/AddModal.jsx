import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  FormLabel, FormGroup, FormControl, Modal, Button, Form,
} from 'react-bootstrap';
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
        notification.successToast(t('toast.createChannel'));
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
          <FormGroup>
            <Form.Control
              className="mb-2"
              name="name"
              id="name"
              required
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
              ref={inputElem}
            />
            <FormLabel htmlFor="name" className="visually-hidden">{t('modals.renameModal.nameOfChannel')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>

            <div className="d-flex justify-content-end">
              <Button
                className="mt-2 me-2 btn btn-secondary"
                onClick={close}
                type="button"
              >
                {t('modals.buttons.cancel')}
              </Button>
              <Button
                className="btn btn-primary mt-2"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.buttons.send')}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default AddModal;
