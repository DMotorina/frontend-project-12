import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Row, Container, Col, Nav, Form, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { io } from 'socket.io-client';
import cn from 'classnames';

import { getChannels, addChannel, removeChannel } from '../../slices/channelsSlice';
import { getMessages, addMessage } from '../../slices/messagesSlice';

import { PlusIcon } from "../../assets/icons/PlusIcon";

import { AddModal } from "../modal/AddModal";
import { RemoveModal } from "../modal/RemoveModal";
import { RenameModal } from "../modal/RenameModal";

const socket = io();

const getActiveChannelMessages = (messages, id) => messages.filter((message) => message.channelId === id);

export const Home = () => {
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
    }, []);

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
        const newMessage = { body: inputMessage, channelId: activeChannel.id, username };
    
        await axios.post('/api/v1/messages', newMessage, { headers: { Authorization: `Bearer ${token}` } });
        socket.emit('newMessage', newMessage);
    
        setInputMessage('');
    };

    const handleChannelSubmit = async (event) => {
        event.preventDefault();

        const newChannel = { name: inputChannel };

        await axios.post('/api/v1/channels', newChannel, { headers: { Authorization: `Bearer ${token}` } })
        socket.emit('newChannel', { newChannel });
        setInputChannel('');
        handleClose()
    }
    
    const handleRemoveChannelSubmit = async (event) => {
        event.preventDefault();
        
        const removeChannelId = activeChannel.id

        await axios.delete(`/api/v1/channels/${removeChannelId}`, { headers: { Authorization: `Bearer ${token}` } })
        socket.emit('removeChannel');
        handleRemoveClose()
    }

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                        <b>Каналы</b>
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
                        {currentChannels.map(({ id, name, removable }) => {
                            if (!removable) {
                                return (
                                <li key={id} className="nav-item w-100">
                                    <button id={id} type="button" className={getClassName(id)} onClick={() => changeActiveChannel(id, name)}>
                                    <span className="me-1">#</span>
                                    {name}
                                    </button>
                                </li>
                                );
                            }

                            return (
                                <Dropdown key={id} className="d-flex" as={ButtonGroup}>
                                    <button type="button" id={id} className={getClassName(id)} onClick={() => changeActiveChannel(id, name)}>
                                        <span className="me-1">#</span>
                                        {name}
                                    </button>
                                    <Dropdown.Toggle split variant={activeChannel.id === id ? 'secondary' : 'none'} id="dropdown-split-basic secondary" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleRemoveShow}>Удалить</Dropdown.Item>
                                        <Dropdown.Item onClick={handleRenameShow}>Переименовать</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            );
                        })}
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

                {/* 2 */}
                <Col className="p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0"><b># {activeChannel.name}</b></p>
                            <span className="text-muted">{activeChannelMessages.length} сообщений</span>
                        </div>

                        <div id="message-box" className="chat-messages overflow-auto px-5">
                            {activeChannelMessages.map((message) => {
                                    return (
                                        <div key={message.id} className="text-break mb-2">
                                            <b>{message.username}</b>
                                            : {message.body}
                                        </div>
                                    )
                                }
                            )}
                        </div>

                        <div className="mt-auto px-5 py-3">
                            <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
                                <div className="input-group">
                                <Form.Control
                                    name="body"
                                    aria-label="Новое сообщение"
                                    placeholder="Введите сообщение..."
                                    className="border-0 p-0 ps-2"
                                    value={inputMessage}
                                    onChange={handleChangeInputMessage}
                                    ref={inputElement}
                                />
                                <Button type="submit" className="btn btn-group-vertical">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                    </svg>
                                    <span className="visually-hidden">Отправить</span>
                                </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
