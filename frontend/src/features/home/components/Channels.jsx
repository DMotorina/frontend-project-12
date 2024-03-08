import React from "react";
import { Nav } from 'react-bootstrap';

export const Channels = ({currentChannels}) => {
    return (
        <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {currentChannels.map(({id, name}) => {
                return (
                    <li key={id} className="nav-item w-100">
                        <button 
                            type="button" 
                            className="w-100 rounded-0 text-start btn"
                        >
                            <span className="me-1"># {name}</span>
                        </button>
                    </li>
                )
            })}
        </Nav>
    )
}