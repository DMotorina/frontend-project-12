import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setModalShow } from '../../../../slices/modalSlice.js';
import image from '../../../../assets/button.svg';

const ChannelAddForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = (type) => () => {
    dispatch(setModalShow({ type }));
  };

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('pages.chat.channels')}</b>
      <button
        className="p-0 text-primary btn btn-group-vertical"
        type="button"
        onClick={handleAddChannel('adding')}
      >
        <img src={image} alt="Добавить канал" />
        <span className="visually-hidden">add</span>
      </button>
    </div>
  );
};

export default ChannelAddForm;
