let notaEscrita = document.getElementById('novaNota')
let corDaNota = document.getElementById('corNota')
let main = document.getElementById('container')
let modoFundo = document.getElementById('modoFundo')
let botaoModoFundo = document.getElementById('botaoModoFundo');

if (localStorage.fundo == undefined) { //COR DE FUNDO
  localStorage.fundo = 'isLight'
  localStorage.valor = 0
}
document.body.className = String(localStorage.fundo)
let valor = localStorage.valor
if (document.body.className == 'isDark') {
  notaEscrita.style.backgroundColor = 'var(--marromEscuro)'
  notaEscrita.style.color = 'var(--gelo)'
  corDaNota.value = '#D5BDAF'
  botaoModoFundo.style.marginLeft = '22px'
}
else {
  notaEscrita.className == 'isLight'
  notaEscrita.style.backgroundColor = 'var(--creme)'
  corDaNota.value = '#F5EBE0'
}

if (localStorage.nota) { //carregamento
  main.innerHTML = localStorage.nota;
  let arrayCoresJson = localStorage.corNote
  let arrayCores = JSON.parse(arrayCoresJson)
  let arrayCoresCarregar = Object.values(arrayCores)
  let corNotasExibidas = document.querySelectorAll('p')

  for (let i = 0; i < arrayCoresCarregar.length; i++) {
    corNotasExibidas[i].style.backgroundColor = arrayCoresCarregar[i];
  }
}

function enviar() {//ENVIAR NOVA NOTA
  if (notaEscrita.value !== '') {
    if (localStorage.nota) {
      localStorage.nota += '<div id="' + valor + '">' + '<pre>' + '<p>' + notaEscrita.value + '</p>' + '</pre>' + '<button onclick="removerNota(this.parentNode,' + valor + ')">X' + '</button>' + '</div>'
    }
    else{
      localStorage.nota = '<div id="' + valor + '">' + '<pre>' + '<p>' + notaEscrita.value + '</p>' + '</pre>' + '<button onclick="removerNota(this.parentNode,' + valor + ')">X' + '</button>' + '</div>'
    }
    main.innerHTML = localStorage.nota
    valor++
    localStorage.valor = valor
    if (localStorage.corNote) {//salvando cores
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
  //voltando padrao
  notaEscrita.value = '';
  let teste = document.querySelector('textarea')
  if (String(localStorage.fundo) == 'isLight') {
    teste.style.backgroundColor = '#F5EBE0'
    corDaNota.value = '#F5EBE0'
  }
  else {
    teste.style.backgroundColor = '#D5BDAF'
    corDaNota.value = '#D5BDAF'
  }
}

function corTextarea() {
  let teste = document.querySelector('textarea')
  teste.style.backgroundColor = corDaNota.value
}

function limpar() {//botao clear
  let confirmar;
  if (localStorage.nota) {
    confirmar = confirm('Deseja EXCLUIR PERMANENTEMENTE todas as notas salvas?')
  }
  else {
    alert('Não há notas salvas.')
  }

  if (confirmar) {
    localStorage.removeItem('nota')
    localStorage.removeItem('corNote')
    localStorage.removeItem('fundo')
    localStorage.removeItem('valor')
    location.reload()
  }
}

function removerNota(teste, fe) {//remover nota individual
  let remover = document.getElementById(fe)
  let posicao = Array.prototype.indexOf.call(main.childNodes, remover)
  let confirmacao = confirm(
    'Deseja realmente excluir a nota?'
  )
  if (confirmacao) {
    let arrayCoresJson = localStorage.corNote //pega o localstorage de cores
    let arrayCores = JSON.parse(arrayCoresJson) //joga o JSON para o objeto
    let arrayCoresRemove = Object.values(arrayCores) //joga o objeto para array
    arrayCoresRemove.splice(posicao, 1) //remove o elemento
    let arrayCoresJsonAtualizado = JSON.stringify(Object(arrayCoresRemove)) //json atualizado
    localStorage.corNote = arrayCoresJsonAtualizado //localstorage de cores atualizado
    teste.innerHTML = ''
    main.removeChild(teste)
    localStorage.nota = main.innerHTML
  }
}

modoFundo.addEventListener('click', function() {//botao modo fundo
  if (localStorage.fundo == undefined) {
    localStorage.fundo = 'isLight'
  }
  notaEscrita.className = String(localStorage.fundo)

  document.body.classList.toggle('isLight')
  document.body.classList.toggle('isDark')
  notaEscrita.classList.toggle('isLight')
  notaEscrita.classList.toggle('isDark')

  if (notaEscrita.className == 'isDark') {
    notaEscrita.style.backgroundColor = 'var(--marromEscuro)'
    corDaNota.value = '#D5BDAF'
    localStorage.fundo = 'isDark'
    botaoModoFundo.style.animation = 'onModoEscuro 0.3s ease-in-out forwards'
  }
  else {
    notaEscrita.style.backgroundColor = 'var(--creme)'
    corDaNota.value = '#F5EBE0'
    localStorage.fundo = 'isLight'
    botaoModoFundo.style.animation = 'offModoEscuro 0.3s ease-in-out forwards'
  }
})