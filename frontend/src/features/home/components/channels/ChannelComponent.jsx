import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import leoProfanity from 'leo-profanity';
import axios from 'axios';
import { io } from 'socket.io-client';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { Col, Nav, Button } from 'react-bootstrap';

import Channel from './Channel';

import AddModal from '../../../modal/AddModal';
import RemoveModal from '../../../modal/RemoveModal';
import RenameModal from '../../../modal/RenameModal';

import PlusIcon from '../../../../assets/icons/PlusIcon';

const socket = io();

const ChannelComponent = ({
  currentChannels, activeChannel, setActiveChannel,
}) => {
  const { token } = useSelector((state) => state.users);

  const { t } = useTranslation();

  const [inputChannel, setInputChannel] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleClose = () => setShowAddModal(false);
  const handleShow = () => setShowAddModal(true);

  const handleRemoveClose = () => setShowRemoveModal(false);
  const handleRemoveShow = () => setShowRemoveModal(true);

  const handleRenameClose = () => setShowRenameModal(false);
  const handleRenameShow = () => setShowRenameModal(true);

  const handleChannelSubmit = async (event) => {
    event.preventDefault();

    const newChannel = { name: leoProfanity.clean(inputChannel) };

    await axios.post('/api/v1/channels', newChannel, { headers: { Authorization: `Bearer ${token}` } });
    socket.emit('newChannel', { newChannel });
    setInputChannel('');
    toast.success(t('toast.createChannel'));
    handleClose();
  };

  const handleRemoveChannelSubmit = async (event) => {
    event.preventDefault();

    const removeChannelId = activeChannel.id;

    await axios.delete(`/api/v1/channels/${removeChannelId}`, { headers: { Authorization: `Bearer ${token}` } });
    toast.success(t('toast.removeChannel'));
    socket.emit('removeChannel');
    handleRemoveClose();
  };

  const handleChangeInputChannel = (event) => setInputChannel(event.target.value);
  const changeActiveChannel = (id, name) => setActiveChannel({ id, name });

  const getClassName = (id) => cn('btn w-100 rounded-0 text-start', { 'btn-secondary': activeChannel.id === id });

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {' '}
          {t('pages.chat.channels')}
        </b>
        <Button
          type="button"
          className="btn-light p-0 text-primary btn btn-group-vertical"
          onClick={handleShow}
        >
          <PlusIcon />
          <span className="visually-hidden">+</span>
        </Button>

        <AddModal
          showAddModal={showAddModal}
          handleClose={handleClose}
          handleChannelSubmit={handleChannelSubmit}
          inputChannel={inputChannel}
          handleChangeInputChannel={handleChangeInputChannel}
        />
      </div>

      <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {currentChannels.map((channel) => (
          <Channel
            channel={channel}
            getClassName={getClassName}
            changeActiveChannel={changeActiveChannel}
            activeChannel={activeChannel}
            handleRemoveShow={handleRemoveShow}
            handleRenameShow={handleRenameShow}
          />
        ))}
      </Nav>
      <RemoveModal
        showRemoveModal={showRemoveModal}
        handleRemoveClose={handleRemoveClose}
        handleRemoveChannelSubmit={handleRemoveChannelSubmit}
      />

      <RenameModal
        activeChannel={activeChannel}
        showRenameModal={showRenameModal}
        handleRenameClose={handleRenameClose}
      />
    </Col>
  );
};

export default ChannelComponent;
