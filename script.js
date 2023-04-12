if (localStorage.nota) {
  document.getElementById('container').innerHTML = localStorage.nota;
}

function enviar() {
  if (localStorage.nota) {
    localStorage.nota += '<p>' + document.getElementById('novaNota').value + '</p>'
  }
  else {
    localStorage.nota = '<p>' + document.getElementById('novaNota').value + '</p>'
  }
  document.getElementById('container').innerHTML = localStorage.nota;
  document.getElementById('novaNota').value = '';
}

function agora() {
  localStorage.removeItem('nota')
  location.reload()
}