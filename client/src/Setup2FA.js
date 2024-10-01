import React, { useState } from 'react';
import axios from 'axios';

function Setup2FA() {
    const [username, setUsername] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [secret, setSecret] = useState('');

    const handleSetup = async() => {
        const response = await axios.post('http://localhost:5000/2fa/setup', { username });
        setQrCodeUrl(response.data.qrCodeUrl);
        setSecret(response.data.secret);
    };

    return ( <
        div >
        <
        h2 > Setup 2 FA < /h2> <
        input type = "text"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        placeholder = "Username"
        required /
        >
        <
        button onClick = { handleSetup } > Setup 2 FA < /button> {
            qrCodeUrl && ( <
                div >
                <
                h3 > Scan this QR code with Google Authenticator: < /h3> <
                img src = { qrCodeUrl }
                alt = "QR Code" / >
                <
                /div>
            )
        } <
        /div>
    );
}

export default Setup2FA;