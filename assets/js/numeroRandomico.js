function numeroAleatorio() {
  let resposta = Math.floor(Math.random() * 1000);
  document.getElementById("number").innerHTML = resposta;
}

$(function () {
  document
    .getElementById("generate-number")
    .addEventListener("click", numeroAleatorio);
});
