import React, { createContext, Component } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export default class SocketContextProvider extends Component {
    
    constructor() {
        super();
        this.state = {
            isConnectionOpen : false,
            tweet: null
        }
        this.toggleSocketConnection = this.toggleSocketConnection.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:7777/', {
            autoConnect : false
        });
        this.socket.on('connect', () => {
            this.setState({ isConnectionOpen: this.socket.connected });
        });
        this.socket.on('disconnect', () => {
            this.setState({ isConnectionOpen: this.socket.connected });
        });
        this.socket.on('new-tweet', (data) => {
            this.setState({ tweet: data });
        })
    }

    componentWillUnmount() {
        if(this.socket.connected) {
            this.socket.close();
        }
    }

    toggleSocketConnection() {
        if(this.socket.connected) {
            this.socket.close();
        } else {
            this.socket.open();
        }
    }
    
    render() {
        const { isConnectionOpen, tweet } = this.state;
        const value = {
            isConnectionOpen,
            tweet,
            toggleSocketConnection: this.toggleSocketConnection,
        };
        return (
            <SocketContext.Provider value={value} >
                {this.props.children}
            </SocketContext.Provider>
        );
    }
}