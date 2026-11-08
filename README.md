# Tarefas

Gerenciador de tarefas simples, bonito e que funciona de verdade: **aplicativo para Windows (.exe)**, **aplicativo para Android (.apk)** e versão para navegador, todos com o mesmo código.

## Funcionalidades

- Adicionar, editar, excluir (com **Desfazer**) e concluir tarefas
- **Subtarefas** com contador de progresso
- **Tarefas recorrentes** (todo dia, toda semana, todo mês), com conclusão do dia e volta automática no dia seguinte
- Categorias, prioridade (baixa, média, alta), prazo e hora do lembrete
- Filtros: Todas, Hoje, Pendentes, Concluídas, por categoria, e busca por texto
- Ordenação: sua própria ordem (arrastar no computador, botões ▲ ▼ no celular), prioridade, prazo ou mais recentes
- Painel de progresso com a porcentagem concluída
- Tema claro e escuro (automático ou manual)
- **Lembretes** com notificações no Windows e no Android
- Exportar a lista como texto (Markdown) e fazer backup/restauração em JSON
- Layout próprio para computador (duas colunas) e para celular (botão flutuante e painel inferior)

### Só no Windows
- Continua na bandeja do sistema ao fechar a janela, para os lembretes funcionarem
- Opção de abrir junto com o Windows
- Salvar e abrir backup por janelas nativas
- Atalhos: `Ctrl+N` nova tarefa, `Ctrl+F` buscar

## Baixar

Na aba **Releases** do repositório ficam o `Tarefas.exe` (Windows) e o `Tarefas.apk` (Android), quando publicados.

## Gerar o .exe (Windows)

Requisito: [Node.js LTS](https://nodejs.org).

```bash
npm install
npm run dist
```

O programa fica em `dist/Tarefas.exe` e abre sem instalação. No Windows, dê dois cliques em `GERAR-EXE.bat` para fazer o mesmo. Para só testar: `npm start` ou `TESTAR-SEM-GERAR.bat`.

> Se aparecer erro de *symbolic link*, execute como administrador ou ative o Modo de Desenvolvedor do Windows.

## Gerar o .apk (Android)

### Pelo GitHub (não precisa instalar nada)
1. Envie o projeto para o GitHub.
2. Abra a aba **Actions**, escolha **Gerar APK Android** e clique em **Run workflow**.
3. Quando terminar (alguns minutos), abra a execução e baixe **Tarefas-android-apk** em *Artifacts*. Dentro do zip está o `Tarefas.apk`.

Para publicar na aba Releases automaticamente, crie uma tag: `git tag v1.0.0 && git push origin v1.0.0`.

### No seu computador
Requisitos: Node.js e Android Studio.

```bash
cd mobile
npm install
mkdir www && cp ../index.html www/index.html
npx cap add android
npx cap sync android
npx cap open android
```

No Android Studio, use **Build > Build APK(s)**.

### Instalar no celular
Envie o `Tarefas.apk` para o aparelho e abra. O Android vai pedir permissão para instalar apps de fontes desconhecidas. O APK gerado é de teste (*debug*), ótimo para uso pessoal. Para publicar na Google Play é preciso gerar uma versão assinada.

## Onde ficam os dados

- **Windows:** `%APPDATA%/tarefas/tarefas.json`
- **Android e navegador:** armazenamento local do aplicativo ou navegador (não sincroniza entre aparelhos; use o backup JSON para levar as tarefas de um lugar para outro)

## Estrutura

```
index.html          interface (usada no Windows, Android e navegador)
main.js, preload.js aplicativo desktop (Electron)
mobile/             projeto Android (Capacitor)
.github/workflows/  geração automática do APK
icon.png            ícone
```

## Tecnologias

HTML, CSS e JavaScript puros, [Electron](https://www.electronjs.org) (Windows) e [Capacitor](https://capacitorjs.com) (Android).

## Licença

Defina a licença do projeto (por exemplo, MIT) adicionando um arquivo `LICENSE`.
