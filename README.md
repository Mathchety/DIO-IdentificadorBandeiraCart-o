# 💳 Identificador de Bandeira de Cartão

Projeto desenvolvido como parte do desafio **DIO – Identificador de Bandeira de Cartão de Crédito**, com apoio do **GitHub Copilot** como assistente de codificação.

## 📋 Descrição

Aplicação web que identifica automaticamente a bandeira de um cartão de crédito com base no número digitado. O sistema aplica os padrões de prefixo de cada bandeira e valida o número completo usando o **algoritmo de Luhn**.

## 🚀 Como usar

1. Abra o arquivo `index.html` no navegador, ou acesse a versão publicada via GitHub Pages.
2. Digite o número do cartão no campo de entrada.
3. A bandeira é identificada em tempo real conforme os dígitos são inseridos.
4. Ao completar o número, o sistema informa se ele é válido (Luhn) ou não.

## 🏦 Bandeiras suportadas

| Bandeira          | Prefixo                         | Comprimento |
|-------------------|---------------------------------|-------------|
| Visa              | 4                               | 13, 16, 19  |
| MasterCard        | 51–55 / 2221–2720               | 16          |
| American Express  | 34, 37                          | 15          |
| Discover          | 6011, 65                        | 16          |
| Diners Club       | 300–305, 36, 38                 | 14          |
| JCB               | 2131, 1800, 35xx                | 15, 16      |
| Elo               | Vários (emitida no Brasil)      | 16          |
| Hipercard         | 606282, 3841                    | 13, 16, 19  |

## 🧠 Funcionalidades

- ✅ Identificação em tempo real da bandeira
- ✅ Validação do número pelo **algoritmo de Luhn**
- ✅ Formatação automática do número (grupos de 4 dígitos)
- ✅ Preview animado do cartão
- ✅ Destaque visual da bandeira reconhecida
- ✅ Interface responsiva (mobile-friendly)

## 🛠️ Tecnologias

- **HTML5** – estrutura semântica
- **CSS3** – layout responsivo com CSS Grid e Custom Properties
- **JavaScript (ES6+)** – lógica de detecção e validação, sem dependências externas

## 🎯 Objetivos de Aprendizagem

- Reproduzir e aprimorar um projeto com base em um código existente;
- Aplicar conceitos de JavaScript puro em um cenário real;
- Documentar o raciocínio técnico e decisões de forma clara;
- Utilizar o GitHub para versionamento e exposição do trabalho.

## 📁 Estrutura do Projeto

```
├── index.html   # Interface da aplicação
├── style.css    # Estilos visuais
├── script.js    # Lógica de detecção e validação
└── README.md    # Documentação
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
