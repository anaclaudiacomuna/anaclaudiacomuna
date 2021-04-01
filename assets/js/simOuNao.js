function simOuNao() {
  let resposta = Math.floor(Math.random() * 2);
  if (resposta === 0) {
    resposta = "Não";
    document.getElementById("decision").innerHTML = resposta;
  } else {
    resposta = "Sim";
    document.getElementById("decision").innerHTML = resposta;
  }
}

$(function () {
  document
    .getElementById("generate-decision")
    .addEventListener("click", simOuNao);
});
