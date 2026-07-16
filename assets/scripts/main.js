import {
  VagaFrontEnd,
  encontrarMelhorVaga,
  gerarRecomendacao,
  criarContadorDeAnalises
} from "./motor.js";

const vagas = [
  new VagaFrontEnd(1, "TechNuvem", "Desenvolvedor(a) Front-end", ["HTML", "CSS", "JavaScript"], 3500, "Vale Refeição", "Remoto", "Júnior"),
  new VagaFrontEnd(2, "WebCore", "Front-end Developer", ["HTML", "CSS", "React", "Git"], 3000, "Plano de Saúde", "Híbrido", "Júnior")
];

const habilidadesCandidato = ["HTML", " css ", "JavaScript"];

const resultados = vagas.map(vaga => {
  return { vaga: vaga, analise: vaga.calcularCompatibilidade(habilidadesCandidato) };
});

const melhor = encontrarMelhorVaga(resultados);
console.log(melhor.vaga.exibirResumo());
console.log(melhor.analise.percentual + "% — " + melhor.vaga.classificar(melhor.analise.percentual));
console.log(gerarRecomendacao(melhor.analise.faltantes));

const contador = criarContadorDeAnalises();
console.log("Análises na sessão: " + contador());
console.log("Análises na sessão: " + contador());