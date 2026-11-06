
import { buscarEventos, confirmarInscricoes } from '../services/api.js';
import { Navbar, ativarNavbar } from '../components/Navbar.js';

export async function mostrarInscricoes(app) {

    app.innerHTML = `
        ${Navbar()}
        <main>
            <h1>Minhas inscrições</h1>
            <p>Eventos em que você se inscreveu.</p>
            <div id="lista">Carregando...</div>
        </main>
    `;

    ativarNavbar();

    const lista = document.querySelector('#lista');

    let eventos;

    try {
        eventos = await buscarEventos();
    } catch (erro) {
        lista.textContent = 'Erro ao buscar eventos. Verifique o backend.';
        return;
    }

    function atualizar() {

        // Busca as inscrições salvas no navegador
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '[]');

        const selecionados = eventos.filter(evento =>
            inscricoes.includes(evento.id)
        );

        if (selecionados.length === 0) {
            lista.innerHTML = '<p>Você ainda não tem inscrições.</p>';
            return;
        }

        lista.innerHTML = `
            <p>Total de inscrições: ${selecionados.length}</p>

            ${selecionados.map(evento => `
                <div class="inscricao">
                    <div>
                        <b>${evento.nome}</b>
                        <p>
                            ${new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                            - ${evento.local}
                        </p>
                    </div>

                    <button data-remover="${evento.id}">
                        Remover
                    </button>
                </div>
            `).join('')}

            <button id="confirmar">Confirmar inscrições</button>
        `;

        // Remove uma inscrição
        document.querySelectorAll('[data-remover]').forEach(botao => {

            botao.onclick = () => {
                const id = Number(botao.dataset.remover);

                const novaLista = inscricoes.filter(item => item !== id);

                localStorage.setItem('inscricoes', JSON.stringify(novaLista));

                atualizar();
            };

        });

        // Confirma as inscrições no backend
        document.querySelector('#confirmar').onclick = async () => {

            const botao = document.querySelector('#confirmar');

            botao.disabled = true;
            botao.textContent = 'Confirmando...';

            try {
                const ids = selecionados.map(evento => evento.id);

                const resultado = await confirmarInscricoes(ids);

                alert(resultado.mensagem);

            } catch (erro) {
                alert('Erro ao confirmar inscrições. Verifique o backend.');

            } finally {
                botao.disabled = false;
                botao.textContent = 'Confirmar inscrições';
            }
        };
    }

    atualizar();
}
