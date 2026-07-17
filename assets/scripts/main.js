// main.js — ponto de entrada: liga formulário, motor, dados e tela.

import { encontrarMelhorVaga, gerarRecomendacao, criarContadorDeAnalises, normalizar } from "./motor.js";
import { carregarVagas, salvarPerfil, carregarPerfil, salvarTema, carregarTema } from "./dados.js";
import { mostrarStatus, mostrarErroFormulario, limparResultados, limparCards, preencherFormulario, renderizarCard, renderizarDestaque } from "./ui.js";

const formulario = document.querySelector("#form-perfil");
const seletorOrdenacao = document.querySelector("#ordenar");
const botaoTema = document.querySelector("#botao-tema");
const contarAnalise = criarContadorDeAnalises();

let ultimosResultados = [];

const perfilSalvo = carregarPerfil();
if (perfilSalvo !== null) {
  preencherFormulario(perfilSalvo);
}

const temaSalvo = carregarTema();
if (temaSalvo !== null) {
  aplicarTema(temaSalvo);
}

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const perfil = montarPerfil();
  if (!validarPerfil(perfil)) {
    return;
  }

  salvarPerfil(perfil);
  limparResultados();
  mostrarStatus("Carregando vagas…");

  try {
    const vagas = await carregarVagas();
    analisar(perfil, vagas, exibirResultados);
  } catch (erro) {
    mostrarStatus("Não foi possível carregar as vagas. Tente novamente em alguns instantes.");
  }
});

botaoTema.addEventListener("click", function () {
  const novoTema = document.body.classList.contains("tema-escuro") ? "claro" : "escuro";
  salvarTema(novoTema);
  aplicarTema(novoTema);
});

seletorOrdenacao.addEventListener("change", function () {
  if (ultimosResultados.length === 0) {
    return;
  }
  limparCards();
  renderizarCards(ultimosResultados);
});

function aplicarTema(tema) {
  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
  } else {
    document.body.classList.remove("tema-escuro");
  }
  botaoTema.setAttribute("aria-pressed", tema === "escuro");
}

function ordenarResultados(resultados, criterio) {
  const copia = resultados.slice();
  if (criterio === "salario") {
    copia.sort((a, b) => b.vaga.salario - a.vaga.salario);
  } else if (criterio === "modalidade") {
    copia.sort((a, b) => a.vaga.modalidade.localeCompare(b.vaga.modalidade));
  } else {
    copia.sort((a, b) => b.analise.percentual - a.analise.percentual);
  }
  return copia;
}

function renderizarCards(resultados) {
  const ordenados = ordenarResultados(resultados, seletorOrdenacao.value);
  ordenados.forEach(resultado => renderizarCard(resultado.vaga, resultado.analise));
}

function montarPerfil() {
  return {
    nome: document.querySelector("#nome").value.trim(),
    area: document.querySelector("#area").value.trim(),
    habilidades: document.querySelector("#habilidades").value.split(",").map(h => normalizar(h)).filter(h => h !== ""),
    experienciaMeses: Number(document.querySelector("#experiencia").value)
  };
}

function validarPerfil(perfil) {
  if (perfil.nome === "" || perfil.area === "" || perfil.habilidades.length === 0) {
    mostrarErroFormulario("Preencha nome, área de atuação e pelo menos uma habilidade.");
    return false;
  }
  mostrarErroFormulario("");
  return true;
}

function analisar(perfil, vagas, aoConcluir) {
  const resultados = vagas.map(vaga => {
    return { vaga: vaga, analise: vaga.calcularCompatibilidade(perfil.habilidades) };
  });
  aoConcluir(resultados, perfil);
}

function exibirResultados(resultados, perfil) {
  if (resultados.length === 0) {
    mostrarStatus("Nada encontrado. Nenhuma vaga disponível no momento.");
    return;
  }

  ultimosResultados = resultados;

  const melhor = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(melhor.analise.faltantes);

  renderizarDestaque(melhor, recomendacao, perfil);
  renderizarCards(resultados);

  mostrarStatus(`Análise nº ${contarAnalise()} da sessão concluída.`);
}