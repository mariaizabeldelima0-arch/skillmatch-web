# SkillMatch Web

Site que compara as suas habilidades com os requisitos de vagas de front-end júnior, mostra o quanto você combina com cada uma e sugere o que estudar para melhorar suas chances.

Acesse online: https://mariaizabeldelima0-arch.github.io/skillmatch-web/

Vídeo de apresentação: https://drive.google.com/drive/folders/1_SEycyLCpZ8UZgfVVnbH7EVlYaoPwrIi

Quadro no Trello: https://trello.com/invite/b/6a4e7d185f948ab0563a1894/ATTIecbdfba6b32c1989abb9bafc591b669f811A0B0A/skillmatch-web

## O que ele resolve

A ideia é simples: você preenche seu perfil (nome, área, habilidades e tempo de experiência), o site analisa as vagas disponíveis e mostra o percentual de compatibilidade de cada uma. Além disso, ele aponta a melhor vaga para você e recomenda quais habilidades estudar para aumentar essa compatibilidade.

## O que o site faz

- Formulário de perfil com validação e aviso de erro quando falta preencher algo
- Cálculo de compatibilidade de cada vaga, mostrando o que você já tem e o que falta
- Classificação das vagas em Alta, Média ou Baixa
- Destaque da vaga mais compatível com uma recomendação de estudo
- Vagas carregadas de um arquivo de dados, com aviso de carregando, de erro e de nada encontrado
- O perfil fica salvo, então quando você volta ele já aparece preenchido
- Funciona bem no celular e no computador
- Ordenar as vagas por compatibilidade, salário ou modalidade
- Tema claro e escuro, que fica salvo para a próxima visita
- Publicado online pelo GitHub Pages

## Tecnologias usadas

Feito com HTML, CSS e JavaScript puro, sem nenhum framework. O JavaScript foi separado em partes, cada uma com sua função: uma cuida das regras e dos cálculos, outra busca os dados e salva o perfil, outra desenha a tela e outra junta tudo. O visual usa Flexbox e foi pensado primeiro para o celular. O controle de versão foi feito com Git e GitHub.

## Como usar

Como o projeto usa recursos que não funcionam abrindo o arquivo direto no navegador, ele precisa de um servidor local:

1. Abra a pasta no VS Code
2. Instale a extensão Live Server
3. Clique com o botão direito no index.html e escolha "Open with Live Server"

Ou então é só acessar pelo link do GitHub Pages, sem precisar instalar nada.

## Estrutura das pastas

skillmatch-web/
├── index.html
├── README.md
└── assets/
├── styles/ estilos do site
├── scripts/ os códigos JavaScript
├── dados/ o catálogo de vagas
└── img/ a logo

## Sobre o código

Sobre var, let e const: usei const na maior parte do projeto, porque quase tudo não muda depois de criado. Usei let só onde o valor realmente precisa mudar, como na variável que guarda a última análise para reordenar as vagas sem buscar tudo de novo. Não usei var, porque const e let são mais seguros e evitam confusão.

Sobre o debugger: usei a ferramenta de depuração do navegador para colocar uma pausa no meio do cálculo de compatibilidade e conferir se as habilidades digitadas com espaços e letras maiúsculas estavam chegando limpas na hora de comparar. Consegui ver os valores no meio do caminho e confirmar que estava tudo certo.

Sobre segurança: o site só guarda o perfil e a preferência de tema. Nunca guarda senha ou dado sensível.

## O que dá para melhorar

- Padronizar a cor do percentual no destaque da melhor vaga, para acompanhar a classificação como acontece nos cards
- Adicionar testes automáticos para conferir o cálculo sozinho, sem precisar testar na mão
- No próximo módulo, refazer a tela usando React, aproveitando a parte de regras que já está separada

---

Projeto individual do Módulo 1 — Front-End React T2.
