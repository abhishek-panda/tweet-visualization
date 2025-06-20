import React, { createContext, Component } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export default class SocketContextProvider extends Component {
    
    constructor() {
        super();
        this.state = {
            isConnectionOpen : false,
            tweet: null,
            onlineUser: 0,
            hoveredTweet: null
        }
        this.toggleSocketConnection = this.toggleSocketConnection.bind(this);
        this.updateHoveredTweet = this.updateHoveredTweet.bind(this);
        this.getHoveredTweet = this.getHoveredTweet.bind(this);
    }

    componentDidMount() {
        this.socket = io(window.location.origin, {
            autoConnect : false
        });
        this.socket.on('connect', () => {
            this.setState({ 
                isConnectionOpen: this.socket.connected,
                tweet: null,
            });
        });
        this.socket.on('disconnect', () => {
            this.setState(prevState => {
                return { 
                    isConnectionOpen: this.socket.connected,
                    tweet: null,
                    onlineUser : prevState.onlineUser - 1
                }
            });
        });
        this.socket.on('new-tweet', (data) => {
            this.setState({ tweet: data });
        });
        this.socket.on('userstats', data => {
            this.setState({ onlineUser: data});
        });
    }

    updateHoveredTweet(data){
        this.setState({ hoveredTweet: data });
    }

    getHoveredTweet() {
        return this.state.hoveredTweet; 
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
        const { isConnectionOpen, tweet, onlineUser } = this.state;
        const value = {
            onlineUser,
            isConnectionOpen,
            tweet,
            toggleSocketConnection: this.toggleSocketConnection,
            updateHoveredTweet: this.updateHoveredTweet,
            getHoveredTweet: this.getHoveredTweet
        };
        return (
            <SocketContext.Provider value={value} >
                {this.props.children}
            </SocketContext.Provider>
        );
    }
}
