import { VagaFrontEnd } from "./motor.js";

const vagaTeste = new VagaFrontEnd(
  1,
  "TechNuvem",
  "Desenvolvedor(a) Front-end",
  ["HTML", "CSS", "JavaScript"],
  3500,
  "Vale Refeição",
  "Remoto",
  "Júnior"
);

const analise = vagaTeste.calcularCompatibilidade(["html", " CSS ", "React"]);
console.log(analise);
console.log(vagaTeste.classificar(analise.percentual));
console.log(vagaTeste.exibirResumo());