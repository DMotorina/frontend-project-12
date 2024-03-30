import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Row, Container, Col, Nav, Button,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { getChannels, addChannel, removeChannel } from '../../slices/channelsSlice';
import { getMessages, addMessage } from '../../slices/messagesSlice';

import PlusIcon from '../../assets/icons/PlusIcon';

import AddModal from '../modal/AddModal';
import RemoveModal from '../modal/RemoveModal';
import RenameModal from '../modal/RenameModal';
import Channel from './components/channels/Channel';
// import MessageHeader from './components/messages/MessageHeader';
// import Message from './components/messages/Message';
// import MessageForm from './components/messages/MessageForm';
import MessageComponent from './components/messages/MessageComponent';

const socket = io();

const getActiveChannelMessages = (messages, id) => (
  messages.filter((message) => message.channelId === id)
);

const Home = () => {
  const { t } = useTranslation();

  const { token, username } = useSelector((state) => state.users);
  const currentChannels = useSelector((state) => state.channels.channels);
  const currentMessages = useSelector((state) => state.messages.messages);

  const dispatch = useDispatch();

  const inputElement = useRef(null);

  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });
  const [inputMessage, setInputMessage] = useState('');
  const [inputChannel, setInputChannel] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  useEffect(() => {
    const getChatChannels = async () => {
      const channels = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(getChannels(channels.data));
    };

    getChatChannels();
  }, [dispatch, token]);

  useEffect(() => {
    const getChatMessages = async () => {
      const messages = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(getMessages(messages.data));
    };

    getChatMessages();
  }, [dispatch, token]);

  useEffect(() => {
    inputElement.current.focus();
  }, [activeChannel]);

  useEffect(() => {
    const getMessage = async () => {
      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });
    };

    getMessage();
  }, [dispatch]);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
  }, [dispatch]);

  const getClassName = (id) => cn('btn w-100 rounded-0 text-start', { 'btn-secondary': activeChannel.id === id });
  const activeChannelMessages = getActiveChannelMessages(currentMessages, activeChannel.id);

  const changeActiveChannel = (id, name) => setActiveChannel({ id, name });
  const handleChangeInputMessage = (event) => setInputMessage(event.target.value);

  const handleClose = () => setShowAddModal(false);
  const handleShow = () => setShowAddModal(true);

  const handleRemoveClose = () => setShowRemoveModal(false);
  const handleRemoveShow = () => setShowRemoveModal(true);

  const handleRenameClose = () => setShowRenameModal(false);
  const handleRenameShow = () => setShowRenameModal(true);

  const handleChangeInputChannel = (event) => setInputChannel(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      body: leoProfanity.clean(inputMessage),
      channelId: activeChannel.id,
      username,
    };

    await axios.post('/api/v1/messages', newMessage, { headers: { Authorization: `Bearer ${token}` } });
    socket.emit('newMessage', newMessage);

    setInputMessage('');
  };

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

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
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
            token={token}
            activeChannel={activeChannel}
            showRenameModal={showRenameModal}
            handleRenameClose={handleRenameClose}
          />
        </Col>

        <MessageComponent
          activeChannel={activeChannel}
          activeChannelMessages={activeChannelMessages}
          handleSubmit={handleSubmit}
          inputMessage={inputMessage}
          handleChangeInputMessage={handleChangeInputMessage}
          inputElement={inputElement}
        />
      </Row>
    </Container>
  );
};

export default Home;
