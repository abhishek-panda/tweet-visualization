import React, { Fragment } from 'react';
import SocketContextProvider from './context/socket-context';
import TwitterDataVisualization from './TwitterDataVisualization';
import ScrollData from './ScrollData';
import Button from './Button';
import ActiveUserStats from './ActiveUserStats'
import {
    FlexWrapper,
} from './styles'


const App = () => {
    return (
        <SocketContextProvider>
            <Button>Real-time tweets</Button>
            <ActiveUserStats />
            <FlexWrapper>
                <TwitterDataVisualization />
                <ScrollData />
            </FlexWrapper>
        </SocketContextProvider>
    ) 
}

export default App;