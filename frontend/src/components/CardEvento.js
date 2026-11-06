
export function CardEvento(evento, inscrito) {

    // Formata a data do evento
    const data = new Date(evento.data + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR');

    // Verifica se o usuário já está inscrito
    let textoBotao = 'Inscrever-se';
    let botaoDesabilitado = '';

    if (inscrito) {
        textoBotao = 'Inscrito';
        botaoDesabilitado = 'disabled';
    }

    return `
        <article class="card">
            <img src="${evento.imagem}" alt="Imagem do evento ${evento.nome}">

            <div class="conteudo">
                <small>${evento.categoria}</small>

                <h3>${evento.nome}</h3>

                <p>${evento.descricao}</p>

                <p><b>Data:</b> ${dataFormatada} às ${evento.horario}</p>

                <p><b>Local:</b> ${evento.local}</p>

                <button data-inscrever="${evento.id}" ${botaoDesabilitado}>
                    ${textoBotao}
                </button>
            </div>
        </article>
    `;
}
