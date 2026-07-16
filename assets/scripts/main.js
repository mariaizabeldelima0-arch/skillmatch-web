import { carregarVagas, salvarPerfil, carregarPerfil } from "./dados.js";

const vagas = await carregarVagas();
console.log("Vagas carregadas:", vagas.length);
console.log(vagas[0].exibirResumo());

salvarPerfil({ nome: "Mabel", area: "Front-end", habilidades: ["html", "css", "javascript"], experienciaMeses: 8 });
console.log("Perfil recuperado:", carregarPerfil());