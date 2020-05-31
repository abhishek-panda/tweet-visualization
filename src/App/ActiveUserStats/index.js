import React, { Component } from 'react';
import { SocketContext } from '../context/socket-context';
import {
    Wrapper
} from './styles'

export default class ActiveUserStats extends Component {
    render() {
        return (
            <SocketContext.Consumer>
                {(context) => {
                    const { onlineUser } = context;
                    return <Wrapper>Active Users : {onlineUser}</Wrapper>
                }}
            </SocketContext.Consumer>
        );
    }
}