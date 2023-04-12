let notaEscrita = document.getElementById('novaNota')
let main = document.getElementById('container')

if (localStorage.nota) {
  main.innerHTML = localStorage.nota;
}

function enviar() {
  if (notaEscrita.value !== '') {
    if (localStorage.nota) {
      localStorage.nota += '<div>' + '<p>' + notaEscrita.value + '</p>' + '</div>'
    }
    else{
      localStorage.nota = '<div>' + '<p>' + notaEscrita.value + '</p>' + '</div>'
    }
    main.innerHTML = localStorage.nota;
  }
  notaEscrita.value = '';
}

function agora() {
  localStorage.removeItem('nota')
  location.reload()
}