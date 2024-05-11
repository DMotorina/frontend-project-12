import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal, FormGroup, Form, Button,
} from 'react-bootstrap';

import { getActiveChannelId } from '../../slices/selectors';

import useApi from '../../hooks/useApi';

import notification from '../toast/index';

const RemoveModal = ({ isOpen, close }) => {
  const [disabledSumbitBtn, setDisabledSubmitBtn] = useState(false);
  const activeChannelId = useSelector(getActiveChannelId);

  const api = useApi();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabledSubmitBtn(true);

    try {
      await api.removeChannel(activeChannelId);
      notification.successToast(t('toast.removeChannel'));
      close();
    } catch (err) {
      notification.errorNotify(t('errors.network'));
    }
    setDisabledSubmitBtn(false);
  };

  return (

    <Modal centered show={isOpen}>
      <Modal.Header closeButton onHide={close}>
        <Modal.Title>{t('modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <p className="lead">{t('modals.removeModal.areYouSure')}</p>
          </FormGroup>

          <div className="d-flex justify-content-end">
            <Button
              className="btn-secondary mt-2 me-2"
              type="button"
              onClick={close}
            >
              {t('modals.buttons.cancel')}
            </Button>
            <Button
              className="btn-danger mt-2"
              type="submit"
              disabled={disabledSumbitBtn}
            >
              {t('modals.buttons.remove')}
            </Button>
          </div>

        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default RemoveModal;
