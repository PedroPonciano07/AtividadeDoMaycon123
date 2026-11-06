# Sistema de Eventos - versão simples

Projeto com frontend Vite + JavaScript e backend Node.js + Express.
Sem login, sem banco de dados e sem API externa.

## Para rodar

Abra **dois terminais** na pasta do projeto.

**Terminal 1 - backend:**
```bash
cd backend
npm install
npm start
```
API: http://localhost:3000/api/eventos

**Terminal 2 - frontend:**
```bash
cd frontend
npm install
npm run dev
```
Site: http://localhost:5173

Se o PowerShell bloquear `npm`, use `npm.cmd install` e `npm.cmd run dev`.

## Como funciona

- O backend fornece seis eventos cadastrados em `backend/dados/eventos.js`.
- O frontend consulta a API do backend usando `fetch`.
- É possível buscar, inscrever-se, remover e confirmar inscrições.
- As inscrições ficam salvas no `localStorage` do navegador; a confirmação mostra uma mensagem, não envia dados ao servidor.
- Não há autenticação e o mesmo navegador mantém suas inscrições mesmo após atualizar a página.
