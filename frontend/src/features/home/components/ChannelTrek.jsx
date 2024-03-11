import React from "react";
import { Col } from 'react-bootstrap';
import { MessageBox } from "./MessageBox";
import { MessageField } from "./MessageField";

export const ChannelTrek = ({currentChannels, currentMessages}) => {  
    console.log('--currentMessages', currentMessages)  
    return (
        <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    {currentChannels.filter(({id}) => id === '1').map(({id, name}) => {
                        return <p key={id} className="m-0"><b># {name}</b></p>
                    })}
                    <span className="text-muted">{currentMessages.length} сообщений</span>
                </div>

                <MessageBox currentMessages={currentMessages} />
                <MessageField />
            </div>
        </Col>
    )
}