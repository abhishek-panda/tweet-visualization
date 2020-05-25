import React, { Fragment } from 'react';
import SocketContextProvider from './context/socket-context';
import TwitterDataVisualization from './TwitterDataVisualization';
import Button from './Button'


const App = () => {
    return (
        <SocketContextProvider>
            <Button>Real-time tweets</Button>
            <TwitterDataVisualization />
        </SocketContextProvider>
    ) 
}

export default App;