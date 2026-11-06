import { buscarEventos } from '../services/api.js'
import { Navbar, ativarNavbar } from '../components/Navbar.js'

export async function mostrarInscricoes(app) {
  app.innerHTML = `
    ${Navbar()}
    <main>
      <h1>Minhas inscrições</h1>
      <p>Eventos em que você se inscreveu.</p>
      <div id="lista">Carregando...</div>
    </main>
  `
  ativarNavbar()

  const lista = document.querySelector('#lista')
  let eventos
  try {
    eventos = await buscarEventos()
  } catch (erro) {
    lista.textContent = 'Erro ao buscar eventos. Verifique se o backend está ligado.'
    return
  }

  function atualizar() {
    const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]')
    const selecionados = eventos.filter(evento => inscricoes.includes(evento.id))

    if (selecionados.length === 0) {
      lista.innerHTML = '<p>Você ainda não tem inscrições.</p>'
      return
    }

    lista.innerHTML = `
      <p>Total de inscrições: ${selecionados.length}</p>
      ${selecionados.map(evento => `
        <div class="inscricao">
          <div>
            <b>${evento.nome}</b>
            <p>${new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')} - ${evento.local}</p>
          </div>
          <button data-remover="${evento.id}">Remover</button>
        </div>
      `).join('')}
      <button id="confirmar">Confirmar inscrições</button>
    `

    document.querySelectorAll('[data-remover]').forEach(botao => {
      botao.onclick = () => {
        const id = Number(botao.dataset.remover)
        localStorage.setItem('inscricoes', JSON.stringify(inscricoes.filter(item => item !== id)))
        atualizar()
      }
    })

    document.querySelector('#confirmar').onclick = () => {
      alert('Inscrições confirmadas!')
    }
  }

  atualizar()
}
