const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database'); // подключение базы данных
const User = require('./models/User'); // модель пользователя
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync(); // синхронизация модели с базой данных

// Регистрация пользователя
app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json({ message: 'User registered successfully!' });
});

// Включение двухфакторной аутентификации
app.post('/2fa/setup', async(req, res) => {
    const { username } = req.body;
    const secret = speakeasy.generateSecret({ length: 20 });
    const user = await User.findOne({ where: { username } });
    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    res.json({ qrCodeUrl, secret: secret.base32 });
});

// Проверка кода 2FA
app.post('/2fa/verify', async(req, res) => {
    const { username, token } = req.body;
    const user = await User.findOne({ where: { username } });

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });

    if (verified) {
        res.json({ message: '2FA verified successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid token!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});