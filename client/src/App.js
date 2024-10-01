import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Setup2FA from './Setup2FA';
import Verify2FA from './Verify2FA';

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Registration / > }
        /> <
        Route path = "/setup-2fa"
        element = { < Setup2FA / > }
        /> <
        Route path = "/verify-2fa"
        element = { < Verify2FA / > }
        /> <
        /Routes> <
        /Router>
    );
}

export default App;