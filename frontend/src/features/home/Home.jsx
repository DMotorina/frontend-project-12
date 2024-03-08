import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Row, Container } from 'react-bootstrap';

import { getChannels } from '../../slices/channelsSlice';
import { getMessages } from '../../slices/messagesSlice';

import { ChannelsHub } from "./components/ChannelsHub";
import { ChannelTrek } from "./components/ChannelTrek";

export const Home = () => {
    const { token } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const getChatChannels = async () => {
            const channels = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${token}` } });
            dispatch(getChannels(channels.data))
        };

        getChatChannels()
    }, [dispatch, token]);


    useEffect(() => {
        const getChatMessages = async () => {
            const messages = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } });
            dispatch(getMessages(messages.data))
        };
    
        getChatMessages()
    }, [dispatch, token]);

    const currentChannels = useSelector((state) => state.channels.channels);

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <ChannelsHub currentChannels={currentChannels} />
                <ChannelTrek />
            </Row>
        </Container>
    )
}
