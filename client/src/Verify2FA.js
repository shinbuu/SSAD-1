import React, { useState } from 'react';
import axios from 'axios';

function Verify2FA() {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleVerify = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/2fa/verify', { username, token });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return ( <
        div >
        <
        h2 > Verify 2 FA < /h2> <
        form onSubmit = { handleVerify } >
        <
        input type = "text"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        placeholder = "Username"
        required /
        >
        <
        input type = "text"
        value = { token }
        onChange = {
            (e) => setToken(e.target.value) }
        placeholder = "Token"
        required /
        >
        <
        button type = "submit" > Verify < /button> <
        /form> {
            message && < p > { message } < /p>} <
                /div>
        );
    }

    export default Verify2FA;