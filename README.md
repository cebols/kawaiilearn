# 🌸 KawaiiLearn — 日本語

App de aprendizado de japonês com equilíbrio de registro **55% polido / 45% coloquial**: você aprende a estrutura gramatical (です・ます) e, lado a lado, como as pessoas realmente falam hoje (くだけた日本語).

## Conceitos centrais

- **Toggle de registro** — toda frase e diálogo existe nos dois registros; um botão alterna 元気ですか ⇄ 元気？ para ensinar o *mapeamento* entre eles.
- **Progresso livre** — o currículo de 12 semanas é um *ritmo sugerido*, nunca um cadeado. Nada é travado por dia.
- **Spaced repetition (FSRS)** — o mesmo algoritmo do Anki moderno, via [`ts-fsrs`](https://github.com/open-spaced-repetition/ts-fsrs).
- **Multissensorial** — visual (flashcards com mnemônicos), auditivo (TTS japonês em tudo), kinestésico (traçado de kana no canvas, com dedo no celular).
- **Conversas com personagens** — um elenco de amigos/colegas/paqueras com avatares kawaii originais (SVG), cada um "vivendo" num registro: Yuki (casual), Haruto (o barista ☕), Kenji (polido corporativo), Hana (a obaachan vizinha), Aiko (a professora).
- **Bilíngue** — interface e explicações em PT-BR e EN-US, com dicas de pronúncia escritas *por idioma* (as vogais do português são quase as do japonês!).

## Stack

| Camada | Escolha |
|---|---|
| UI | React 19 + TypeScript + Vite + Tailwind CSS 4 |
| Estado | Zustand |
| SRS | ts-fsrs (FSRS) |
| Persistência | IndexedDB via Dexie (local-first, sem backend) |
| Áudio | Web Speech API (TTS ja-JP, plugável) |
| i18n | i18next (pt-BR / en-US) |
| Deploy | GitHub Pages via Actions |

## Rodando

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
```

## Estrutura de conteúdo

O currículo é **dado, não código**: `src/content/` guarda decks, diálogos e a trilha de 12 semanas. Adicionar a Semana 2 = adicionar dados; o motor (SRS, chat, traçado) já está pronto.

```
src/
├── content/        # currículo: kana, vocab (pares de registro), diálogos, personagens
├── srs/            # motor FSRS: fila, agendamento, estatísticas
├── db/             # IndexedDB (Dexie): cards, histórico, config
├── components/     # Dashboard, Flashcards, TraceCanvas, ChatDialogue, ...
├── i18n/           # pt-BR / en-US
└── lib/            # TTS
```

## Roadmap

- [x] Semana 1: hiragana (46), saudações com pares de registro, 3 diálogos
- [ ] Semanas 2–12 (conteúdo)
- [ ] Ordem de traço animada (KanjiVG)
- [ ] Shadowing com gravação de voz
- [ ] Ditado (聞き取り) e montagem de frases
- [ ] Boss tests (semanas 6 e 12) + certificado
- [ ] Modo "japonês de celular" (りょ, 笑, www)
- [ ] Backend opcional para sync entre dispositivos (v2)
