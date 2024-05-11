import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { setModalShow } from '../../../../slices/modalSlice.js';
import plus from '../../../../assets/icons/plus.svg';

const ChannelAddForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = (type) => () => {
    dispatch(setModalShow({ type }));
  };

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('pages.chat.channels')}</b>
      <Button
        variant="group-vertical"
        className="p-0 text-primary"
        type="button"
        onClick={handleAddChannel('adding')}
      >
        <img src={plus} alt="Добавить канал" />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default ChannelAddForm;
