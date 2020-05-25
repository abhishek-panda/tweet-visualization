import React from 'react';
import { SocketContext } from '../context/socket-context';
import { ButtonWrapper } from './styles';

export default class Button extends React.Component {
    render() {
        return (
            <SocketContext.Consumer>
                {(context) => {
                    const { toggleSocketConnection, isConnectionOpen } = context;
                    const preText = isConnectionOpen ? 'Stop' : 'Get';
                    return (
                        <ButtonWrapper onClick={toggleSocketConnection} isActive={isConnectionOpen}>
                            {preText} {this.props.children}
                        </ButtonWrapper>
                    );
                }}
            </SocketContext.Consumer>
        )
    }
}