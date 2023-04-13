let notaEscrita = document.getElementById('novaNota')
let corDaNota = document.getElementById('corNota')
let main = document.getElementById('container')

console.log(localStorage.corNote)
if (localStorage.nota) {
  main.innerHTML = localStorage.nota;
  let arrayCoresJson = localStorage.corNote
  let arrayCores = JSON.parse(arrayCoresJson)
  let corNotasExibidas = document.querySelectorAll('p')
  for (let i = 0; i < arrayCores.length; i++) {
    corNotasExibidas[i].style.backgroundColor = arrayCores[i];
  }
}

function enviar() {
  if (notaEscrita.value !== '') {
    if (localStorage.nota) {
      localStorage.nota += '<div>' + '<pre>' + '<p>' + notaEscrita.value + '</p>' + '</pre>' + '</div>'
    }
    else{
      localStorage.nota = '<div>'+ '<pre>' + '<p>' + notaEscrita.value + '</p>' + '</pre>' + '</div>'
    }
    main.innerHTML = localStorage.nota

    if (localStorage.corNote) {
      let arrayCoresJson = localStorage.corNote //joga o localstorage pra dentro de um json
      let arrayCores = JSON.parse(arrayCoresJson) //transforma o json em array
      arrayCores.push(corDaNota.value) //push no array
      let arrayCoresJsonAtualizado = JSON.stringify(arrayCores) //json atualizado
      localStorage.corNote = arrayCoresJsonAtualizado
    }
    else {
      let arrayCores = [corDaNota.value] //cria um array
      let arrayCoresJson = JSON.stringify(arrayCores) //string JSON
      localStorage.corNote = arrayCoresJson //salva no localstorage
    }
    let arrayCoresJson = localStorage.corNote
    let arrayCores = JSON.parse(arrayCoresJson)
    let ultimaNota = document.querySelectorAll('p')
    for (let i = 0; i < arrayCores.length; i++) {
      ultimaNota[i].style.backgroundColor = arrayCores[i];
    }
  }
  notaEscrita.value = '';
}

function corteste() {
  let teste = document.querySelector('textarea')
  teste.style.backgroundColor = corDaNota.value
}

function agora() {
  localStorage.removeItem('nota')
  localStorage.removeItem('corNote')
  location.reload()
}