import React from "react";
import { Col } from 'react-bootstrap';
import { MessageBox } from "./MessageBox";
import { MessageField } from "./MessageField";

export const ChannelTrek = () => {
    return (
        <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># general</b></p>
                    <span className="text-muted">0 сообщений</span>
                </div>

                <MessageBox />
                <MessageField />
            </div>
        </Col>
    )
}