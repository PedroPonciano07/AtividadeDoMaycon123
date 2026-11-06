import { navegar } from '../main.js'

export function Navbar() {
  return `
    <header>
      <h2>SistemasEventos</h2>
      <nav>
        <button id="ir-eventos">Eventos</button>
        <button id="ir-inscricoes">Minhas inscrições</button>
      </nav>
    </header>
  `
}

export function ativarNavbar() {
  document.querySelector('#ir-eventos').onclick = () => navegar('eventos')
  document.querySelector('#ir-inscricoes').onclick = () => navegar('inscricoes')
}
