function numeroAleatorio(){var e=Math.floor(1e3*Math.random());document.getElementById("number").innerHTML=e}$(function(){document.getElementById("generate-number").addEventListener("click",numeroAleatorio)});