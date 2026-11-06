
// Busca os eventos no backend
export async function buscarEventos() {

    const resposta = await fetch('/api/eventos');

    if (!resposta.ok) {
        throw new Error('Erro ao buscar eventos');
    }

    return resposta.json();
}

// Envia as inscrições para o backend
export async function confirmarInscricoes(inscricoes) {

    const resposta = await fetch('/api/inscricoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inscricoes })
    });

    if (!resposta.ok) {
        throw new Error('Erro ao confirmar inscrições');
    }

    return resposta.json();
}
