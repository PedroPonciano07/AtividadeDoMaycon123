// Busca os eventos no backend
export async function buscarEventos() {
  const resposta = await fetch('/api/eventos')

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os eventos')
  }

  return resposta.json()
}
