
import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { eventos } from './dados/eventos.js';

const app = express();

app.use(cors());
app.use(express.json());

// Lista todos os eventos
app.get('/api/eventos', (req, res) => {
    res.json(eventos);
});

// Busca um evento pelo ID
app.get('/api/eventos/:id', (req, res) => {
    const id = Number(req.params.id);

    const evento = eventos.find(item => item.id === id);

    if (!evento) {
        return res.status(404).json({
            mensagem: 'Evento não encontrado'
        });
    }

    res.json(evento);
});

// Salva as inscrições confirmadas
app.post('/api/inscricoes', async (req, res) => {
    try {
        const { inscricoes } = req.body;

        if (!Array.isArray(inscricoes) || inscricoes.length === 0) {
            return res.status(400).json({
                mensagem: 'Selecione pelo menos um evento'
            });
        }

        // Confere se todos os eventos existem
        const validos = inscricoes.every(id =>
            Number.isInteger(id) &&
            eventos.some(evento => evento.id === id)
        );

        if (!validos) {
            return res.status(400).json({
                mensagem: 'Inscrição inválida'
            });
        }

        const arquivo = new URL('./dados/inscricoes.json', import.meta.url);

        let registros = [];

        try {
            const dados = await readFile(arquivo, 'utf8');
            registros = JSON.parse(dados);
        } catch (erro) {
            if (erro.code !== 'ENOENT') {
                throw erro;
            }
        }

        const registro = {
            id: Date.now(),
            inscricoes: [...new Set(inscricoes)],
            dataConfirmacao: new Date().toISOString()
        };

        registros.push(registro);

        await writeFile(arquivo, JSON.stringify(registros, null, 2));

        res.status(201).json({
            mensagem: 'Inscrições confirmadas com sucesso!',
            registro: registro
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: 'Erro ao salvar inscrições'
        });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Backend funcionando em http://localhost:3000');
});
