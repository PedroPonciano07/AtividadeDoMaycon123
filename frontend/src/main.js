import './style.css'
import { mostrarEventos } from './pages/Eventos.js'
import { mostrarInscricoes } from './pages/MinhasInscricoes.js'

const app = document.querySelector('#app')

export function navegar(pagina) {
  if (pagina === 'inscricoes') {
    mostrarInscricoes(app)
  } else {
    mostrarEventos(app)
  }
}

navegar('eventos')
