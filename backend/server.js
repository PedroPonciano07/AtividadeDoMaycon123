import express from 'express'
import cors from 'cors'
import { eventos } from './dados/eventos.js'

const app = express()

app.use(cors())
app.use(express.json())

// Envia a lista de eventos para o frontend
app.get('/api/eventos', (req, res) => {
  res.json(eventos)
})

// Busca um evento pelo ID
app.get('/api/eventos/:id', (req, res) => {
  const evento = eventos.find(item => item.id === Number(req.params.id))

  if (!evento) {
    return res.status(404).json({ mensagem: 'Evento não encontrado' })
  }

  res.json(evento)
})

app.listen(3000, () => {
  console.log('Backend funcionando em http://localhost:3000')
})
