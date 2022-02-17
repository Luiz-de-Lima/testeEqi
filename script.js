//botão e adicionando um evento de limpar campos
const btnClear = document.querySelector('.btn-clear')
const paragraph = document.querySelectorAll('p')
const inputs = [...document.querySelectorAll('.isvalid')]


btnClear.addEventListener('click', handleClear)

const bntSimule = document.querySelector('.btn-simule').ariaDisabled=true
console.log(bntSimule)

function handleClear(e) {
  e.preventDefault()
  inputs.forEach(input => {
    input.parentNode.classList.remove('error')
    input.value = ''
    paragraph.forEach((paragraphs) => {
      paragraphs.innerText = ''
    })

  })
}

//função que valida os campos


function handleValiDate(e) {
  const value = e.target.value
  const parent = e.target.parentNode
  const feedbackError = parent.querySelector('p')

  if (!value || isNaN(value)) {
    parent.classList.add('error')
    feedbackError.innerText = 'aporte deve ser um número'
  } else if (value <= 0) {
    parent.classList.add('error')
    feedbackError.innerText = 'aporte deve ser um número'

  } else {
    parent.classList.remove('error')
    feedbackError.innerText = ''
  }
}

inputs.forEach((input) => {
  bntSimule.addEventListener('click', dataSimulacoes)

  input.addEventListener('blur', handleValiDate)
})


//chamando a api
const dataIndicadores = () => {

  function filtersInputs(data) {
    data.forEach(({ nome, valor }) => {
      const input = document.querySelector(`input[name="${nome}"]`)
      input.value = `${valor}%`

    })
  }
  const url = ('http://localhost:3000/indicadores/')
  fetch(url)
    .then(response => {
      response.json()
        .then(data => filtersInputs(data))
    })
}
function dataSimulacoes() {
  function filtersSimulations(data) {
    console.log(data)
    data.forEach((item) => {

      const valorFinalBruto = document.querySelector(`span[name="valorFinalBruto"]`).innerHTML = `R$ ${item.valorFinalBruto}`
      const aliquotaIR = document.querySelector(`span[name="aliquotaIR"]`).innerHTML = `${item.aliquotaIR}%`
      const valorPagoIR = document.querySelector(`span[name="valorPagoIR"]`).innerHTML = `R$ ${item.valorPagoIR}`
      const valorFinalLiquido = document.querySelector(`span[name="valorFinalLiquido"]`).innerHTML = `R$ ${item.valorFinalLiquido}`
      const valorTotalInvestido = document.querySelector(`span[name="valorTotalInvestido"]`).innerHTML = `R$ ${item.valorTotalInvestido}`
      const ganhoLiquido = document.querySelector(`span[name="ganhoLiquido"]`).innerHTML = `R$ ${item.ganhoLiquido}`

    })


  }
  const getSimulacoes = () => {
    const url = 'http://localhost:3000/simulacoes?tipoIndexacao=ipca&tipoRendimento=bruto'
    fetch(url)
      .then(response => {
        response.json()
          .then(data => filtersSimulations(data))
      })
  }
  getSimulacoes()
}
dataIndicadores()

const btnBruto = document.querySelector('#bruto')
if (btnBruto.id === 'bruto')
  console.log('ok')




