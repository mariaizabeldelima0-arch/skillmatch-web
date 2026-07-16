// motor.js — o cérebro do SkillMatch: normalização de texto,
// cálculo de compatibilidade e classificação das vagas.
// Este módulo NÃO mexe na tela (DOM) e NÃO busca dados — só regras.

export function normalizar(texto) {
  return texto.trim().toLowerCase();
}

export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, beneficio, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.beneficio = beneficio;
    this.modalidade = modalidade;
  }

  calcularCompatibilidade(habilidadesCandidato) {
    const habilidades = habilidadesCandidato.map(h => normalizar(h));
    const requisitos = this.requisitos.map(r => normalizar(r));
    const encontradas = requisitos.filter(r => habilidades.includes(r));
    const faltantes = requisitos.filter(r => !habilidades.includes(r));
    const percentual = Math.round((encontradas.length / requisitos.length) * 100);
    return { percentual, encontradas, faltantes };
  }

  classificar(percentual) {
    if (percentual >= 80) {
      return "Alta";
    } else if (percentual >= 50) {
      return "Média";
    } else {
      return "Baixa";
    }
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, beneficio, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, beneficio, modalidade);
    this.nivel = nivel;
  }

  exibirResumo() {
    return `${super.exibirResumo()} · Nível: ${this.nivel}`;
  }
}

export function encontrarMelhorVaga(resultados) {
  return resultados.reduce((melhor, atual) =>
    atual.analise.percentual > melhor.analise.percentual ? atual : melhor
  );
}

export function gerarRecomendacao(faltantes) {
  if (faltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos da sua melhor vaga.";
  }
  return `Estude ${faltantes.join(", ")} para aumentar ainda mais sua compatibilidade.`;
}

export function criarContadorDeAnalises() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}