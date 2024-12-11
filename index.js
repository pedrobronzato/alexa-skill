const express = require('express');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const port = 3000;

app.post('/shutdown', (req, res) => {

    const { password } = req.body;

    if (!password || password !== process.env.SECRET_PASSWORD) {
        return res.status(403).send('Acesso negado. Senha incorreta.');
    }

    exec('shutdown /s /t 0', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o comando: ${error.message}`);
            res.status(500).send('Erro ao desligar o computador');
            return;
        }
        res.send('O computador está sendo desligado.');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});