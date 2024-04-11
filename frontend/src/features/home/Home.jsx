import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Row, Container,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';

import { getChannels, addChannel, removeChannel } from '../../slices/channelsSlice';
import { getMessages, addMessage } from '../../slices/messagesSlice';

import MessageComponent from './components/messages/MessageComponent';
import ChannelComponent from './components/channels/ChannelComponent';

const socket = io();

const getActiveChannelMessages = (messages, id) => (
  messages.filter((message) => message.channelId === id)
);

const Home = () => {
  const { token, username } = useSelector((state) => state.users);
  const currentChannels = useSelector((state) => state.channels.channels);
  const currentMessages = useSelector((state) => state.messages.messages);

  const dispatch = useDispatch();

  const inputElement = useRef(null);

  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });
  const [inputMessage, setInputMessage] = useState('');

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

  const activeChannelMessages = getActiveChannelMessages(currentMessages, activeChannel.id);

  const handleChangeInputMessage = (event) => setInputMessage(event.target.value);

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

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelComponent
          currentChannels={currentChannels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
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
