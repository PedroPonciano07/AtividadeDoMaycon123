import { buscarEventos } from '../services/api.js'
import { Navbar, ativarNavbar } from '../components/Navbar.js'
import { CardEvento } from '../components/CardEvento.js'

function obterInscricoes() {
  return JSON.parse(localStorage.getItem('inscricoes') || '[]')
}

export async function mostrarEventos(app) {
  app.innerHTML = `
    ${Navbar()}
    <main>
      <h1>Eventos disponíveis</h1>
      <p>Confira os eventos e faça sua inscrição.</p>
      <input id="busca" placeholder="Buscar eventos..." type="search">
      <div id="lista" class="grade">Carregando...</div>
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
    const busca = document.querySelector('#busca').value.toLowerCase()
    const inscricoes = obterInscricoes()
    const filtrados = eventos.filter(evento =>
      (evento.nome + ' ' + evento.local + ' ' + evento.categoria).toLowerCase().includes(busca)
    )

    lista.innerHTML = filtrados.length
      ? filtrados.map(evento => CardEvento(evento, inscricoes.includes(evento.id))).join('')
      : '<p>Nenhum evento encontrado.</p>'

    document.querySelectorAll('[data-inscrever]').forEach(botao => {
      botao.onclick = () => {
        const id = Number(botao.dataset.inscrever)
        const atual = obterInscricoes()
        if (!atual.includes(id)) {
          atual.push(id)
          localStorage.setItem('inscricoes', JSON.stringify(atual))
        }
        atualizar()
      }
    })
  }

  document.querySelector('#busca').oninput = atualizar
  atualizar()
}
