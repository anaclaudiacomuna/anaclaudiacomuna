function simOuNao(){let e=Math.floor(2*Math.random());e=0===e?"Não":"Sim",document.getElementById("decision").innerHTML=e}$(function(){document.getElementById("generate-decision").addEventListener("click",simOuNao)});