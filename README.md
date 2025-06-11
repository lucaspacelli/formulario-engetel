# Manual Técnico do Formulário de Mapeamento de Perfil - Grupo Engetel

Este repositório contém o formulário de mapeamento de perfil utilizado pelo Grupo Engetel. Abaixo você encontrará instruções para manutenção, atualização e entendimento técnico da estrutura do projeto.

---

## 📌 1. Introdução

Este manual tem como objetivo orientar técnicos e desenvolvedores na manutenção e atualização do formulário de mapeamento de perfil do Grupo Engetel, hospedado na web com integração ao Google Sheets.

---

## 📁 2. Estrutura de Arquivos

- `index.html`: Estrutura HTML do formulário.
- `formulário.css`: Estilização e layout visual.
- `formulário.js`: Scripts de lógica, validação e envio ao Google Sheets.

---

## 🛠️ 3. Tecnologias Utilizadas

- HTML5, CSS3, JavaScript puro (sem frameworks)
- Google Apps Script (integração com Google Sheets)
- GitHub Pages ou Netlify (hospedagem do formulário)

---

## 🚀 4. Funcionamento do Formulário

- O formulário coleta dados do candidato via inputs HTML.
- Validações são feitas em JavaScript (ex: Parte 1 exige 6 respostas para cada valor 0, 2, 4 e 8).
- Os dados são enviados via `fetch()` para um endpoint do Google Apps Script.
- Em caso de sucesso, o usuário é redirecionado para uma página de agradecimento (`agradecimento.html`).

---

## ✏️ 5. Como Alterar o Conteúdo

- Editar perguntas ou opções: modificar diretamente o arquivo `index.html`.
- Alterar estilos visuais: ajustar regras no arquivo `formulário.css`.
- Ajustar lógica de validação ou envio: editar funções no `formulário.js`.

---

## 🔄 6. Como Atualizar e Publicar

### Usando GitHub Pages:

1. Substitua os arquivos atualizados no repositório.
2. Faça commit das alterações.
3. Acesse a URL gerada pelo GitHub Pages (ex: `https://lucaspacelli.github.io/formulario-engetel/`).

> A publicação é automática após o push.

---

## 🧩 7. Como Substituir o Google Sheets

1. Crie uma nova planilha no Google Drive.
2. Crie um novo Google Apps Script vinculado à planilha.
3. Publique como Web App e copie a nova URL.
4. Atualize a URL no `fetch()` dentro do `formulário.js`.

---

## ✅ 8. Boas Práticas de Manutenção

- Faça backup dos arquivos antes de alterações.
- Teste em ambiente local antes de publicar.
- Comente blocos importantes de código no JS.
- Mantenha identação e nomenclatura consistentes.

---

Este projeto é de uso interno do Grupo Engetel. Dúvidas técnicas podem ser encaminhadas ao responsável pela manutenção da área de planejamento.
