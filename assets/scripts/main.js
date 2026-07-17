// main.js — ponto de entrada: liga formulário, motor, dados e tela.

import { encontrarMelhorVaga, gerarRecomendacao, criarContadorDeAnalises, normalizar } from "./motor.js";
import { carregarVagas, salvarPerfil, carregarPerfil } from "./dados.js";
import { mostrarStatus, mostrarErroFormulario, limparResultados, preencherFormulario, renderizarCard, renderizarDestaque } from "./ui.js";

const formulario = document.querySelector("#form-perfil");
const contarAnalise = criarContadorDeAnalises();

const perfilSalvo = carregarPerfil();
if (perfilSalvo !== null) {
  preencherFormulario(perfilSalvo);
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

  const melhor = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(melhor.analise.faltantes);

  renderizarDestaque(melhor, recomendacao, perfil);
  resultados.forEach(resultado => renderizarCard(resultado.vaga, resultado.analise));

  mostrarStatus(`Análise nº ${contarAnalise()} da sessão concluída.`);
}