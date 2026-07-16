// dados.js — a ponte com o mundo externo: busca as vagas (fetch)
// e lembra do perfil do candidato (localStorage).
// Nunca guardar dados sensíveis (senhas, tokens) no localStorage.

import { VagaFrontEnd } from "./motor.js";

export async function carregarVagas() {
  const resposta = await fetch("./assets/dados/vagas.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as vagas.");
  }
  const dados = await resposta.json();
  return dados.map(v => new VagaFrontEnd(v.id, v.empresa, v.cargo, v.requisitos, v.salario, v.beneficio, v.modalidade, v.nivel));
}

export function salvarPerfil(perfil) {
  localStorage.setItem("perfil", JSON.stringify(perfil));
}

export function carregarPerfil() {
  const salvo = localStorage.getItem("perfil");
  if (salvo === null) {
    return null;
  }
  return JSON.parse(salvo);
}