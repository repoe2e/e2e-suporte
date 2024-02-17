
# 🚀 E2E Suporte

Desenvolvido com NextJS e TypeScript.

## Sobre o projeto

Sistema de suporte educacional simples  em que os usuários da aplicação podem cadastrar alunos, visualizar chamados abertos, criar novos chamados e encerrar chamados.

## ✨ Demonstração

- Acesso para rotas autenticadas: https://e2e-suporte.vercel.app/
- Acesso para abertura de chamado rotas não autenticadas: https://e2e-suporte.vercel.app/


## 🎯 Objetivo do projeto

Foi projetado como base para exercícios práticos nas formações da escola.

## 📝 Tecnologias

- [React.js](https://pt-br.reactjs.org)
- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Mongodb](https://www.mongodb.com/pt-br)

## 📝 Configuração do ambiente

Crie um arquivo .env no diretório raiz e adicione as seguintes variáveis:
```bash

DATABASE_URL=
NODE_ENV=development
HOST_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```
- Navegue até https://console.cloud.google.com .
- Crie um novo projeto.
- Vá para APIs e serviços => Credenciais.
- Clique em CRIAR CREDENCIAIS => ID do cliente OAuth.
- Escolha o aplicativo da Web.
- Adicione às origens JavaScript autorizadas: http://localhost:3000 .
- Adicione aos URIs de redirecionamento autorizados: http://localhost:3000/api/auth/callback/google .
- Termine acessando APIs e serviços => tela de consentimento do OAuth e publicando o aplicativo.


## ⚙️ Instalação
*será necessário configurar no arquivo .env variavéis  necessárias para execução local. (Conteúdo de aula)

Para que este rode em sua máquina, siga os passos abaixo:

```bash
# Clone o repositório em alguma pasta em sua máquina
$ git clone https://github.com/repoe2e/e2e-suporte.git

Instale as dependências digitando no termimal:
$ npm install

Rode a aplicação no modo de desenvolvimento.
$ npm run dev

Abra http://localhost:3000 no seu navegador para visualizar o projeto
```
## ⚙️Implantar no Vercel
A maneira mais fácil de implantar seu aplicativo Next.js é usar a plataforma [Vercel](https://vercel.com/) dos criadores do Next.js.

### Bora estudar!
