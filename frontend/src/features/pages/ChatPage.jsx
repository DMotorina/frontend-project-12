import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';

import { fetchMessages } from '../../slices/messagesSlice';
import { fetchChannels } from '../../slices/channelsSlice';

import MessageComponent from '../chatComponents/messages/MessageComponent';
import ChannelComponent from '../chatComponents/channels/ChannelComponent';

import Spinner from '../spinner/Spinner';

const ChatPage = () => {
  const channelsLoadStatus = useSelector((state) => state.channels.status);
  const messagesLoadStatus = useSelector((state) => state.messages.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          {channelsLoadStatus !== 'loaded'
            ? <Spinner />
            : <ChannelComponent />}
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            {messagesLoadStatus !== 'loaded'
              ? <Spinner />
              : <MessageComponent />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
