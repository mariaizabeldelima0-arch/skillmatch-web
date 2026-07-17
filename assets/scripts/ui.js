// ui.js — a tela: desenha cards, destaque e mensagens no DOM.
// Não calcula nada (motor) e não busca nada (dados) — só desenha.

const status = document.querySelector("#status");
const destaque = document.querySelector("#destaque");
const listaVagas = document.querySelector("#lista-vagas");
const erroFormulario = document.querySelector("#erro-formulario");

export function mostrarStatus(mensagem) {
  status.textContent = mensagem;
}

export function mostrarErroFormulario(mensagem) {
  erroFormulario.textContent = mensagem;
}

export function limparResultados() {
  destaque.textContent = "";
  listaVagas.textContent = "";
}

export function preencherFormulario(perfil) {
  document.querySelector("#nome").value = perfil.nome;
  document.querySelector("#area").value = perfil.area;
  document.querySelector("#habilidades").value = perfil.habilidades.join(", ");
  document.querySelector("#experiencia").value = perfil.experienciaMeses;
}

function classeDaClassificacao(classificacao) {
  if (classificacao === "Alta") {
    return "alta";
  } else if (classificacao === "Média") {
    return "media";
  } else {
    return "baixa";
  }
}

export function renderizarCard(vaga, analise) {
  const card = document.createElement("article");
  card.classList.add("card-vaga");

  const titulo = document.createElement("h3");
  titulo.textContent = vaga.cargo;

  const empresa = document.createElement("p");
  empresa.classList.add("card-empresa");
  empresa.textContent = vaga.empresa;

  const detalhes = document.createElement("p");
  detalhes.classList.add("card-detalhes");
  detalhes.textContent = `${vaga.modalidade} · R$ ${vaga.salario}`;

  const classificacao = vaga.classificar(analise.percentual);
  const cor = classeDaClassificacao(classificacao);

  const percentual = document.createElement("p");
  percentual.classList.add("card-percentual", cor);
  percentual.textContent = `${analise.percentual}% compatível`;

  const barra = document.createElement("div");
  barra.classList.add("barra");
  const progresso = document.createElement("div");
  progresso.classList.add("progresso", cor);
  progresso.style.width = `${analise.percentual}%`;
  barra.appendChild(progresso);

  const selo = document.createElement("span");
  selo.classList.add("selo", cor);
  selo.textContent = classificacao;

  const voceTem = document.createElement("p");
  voceTem.classList.add("lista-tem");
  voceTem.textContent = `Você tem: ${analise.encontradas.join(", ")}`;

  const falta = document.createElement("p");
  falta.classList.add("lista-falta");
  falta.textContent = analise.faltantes.length === 0 ? "Falta: nada!" : `Falta: ${analise.faltantes.join(", ")}`;

  card.appendChild(titulo);
  card.appendChild(empresa);
  card.appendChild(detalhes);
  card.appendChild(percentual);
  card.appendChild(barra);
  card.appendChild(selo);
  card.appendChild(voceTem);
  card.appendChild(falta);

  listaVagas.appendChild(card);
}

export function renderizarDestaque(melhor, recomendacao, perfil) {
  const caixa = document.createElement("article");
  caixa.classList.add("destaque-vaga");

  const titulo = document.createElement("h3");
  titulo.textContent = "Sua melhor vaga";

  const resumo = document.createElement("p");
  resumo.classList.add("destaque-resumo");
  resumo.textContent = melhor.vaga.exibirResumo();

  const percentual = document.createElement("p");
  percentual.classList.add("destaque-percentual");
  percentual.textContent = `${melhor.analise.percentual}% compatível — ${melhor.vaga.classificar(melhor.analise.percentual)}`;

  const perfilInfo = document.createElement("p");
  perfilInfo.classList.add("destaque-perfil");
  perfilInfo.textContent = `Perfil analisado: ${perfil.nome} · ${perfil.experienciaMeses} meses de experiência`;

  const caixaRecomendacao = document.createElement("p");
  caixaRecomendacao.classList.add("recomendacao");
  caixaRecomendacao.textContent = `Recomendação de estudo: ${recomendacao}`;

  caixa.appendChild(titulo);
  caixa.appendChild(resumo);
  caixa.appendChild(percentual);
  caixa.appendChild(perfilInfo);
  caixa.appendChild(caixaRecomendacao);

  destaque.appendChild(caixa);
}

export function limparCards() {
  listaVagas.textContent = "";
}