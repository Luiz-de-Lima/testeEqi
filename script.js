//botão e adicionando um evento de limpar campos
const btnClear = document.querySelector('.btn-clear')
const paragraph = document.querySelectorAll('p')
const inputs = [...document.querySelectorAll('.isvalid')]
const cardShow = document.querySelector('.form-result')

const inputsTipoRendimento = [...document.querySelectorAll('input[name="tipoRendimento"]')]
const inputsTipoIndexacao = [...document.querySelectorAll('input[name="tipoIndexacao"]')]


const bntSimule = document.querySelector('.btn-simule')

let tipoRendimento;
let tipoIndexacao;

const saveOptionTipoRendimento = (ev) => {
  tipoRendimento = ev.target.value
}

const saveOptionTipoIndexacao = (ev) => {
  tipoIndexacao = ev.target.value
}


inputsTipoRendimento.forEach((input) => input.addEventListener('click', saveOptionTipoRendimento)
)

inputsTipoIndexacao.forEach((input) => input.addEventListener('click', saveOptionTipoIndexacao)
)


const handleClear = (e) => {
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
    bntSimule.disabled = false
    bntSimule.classList.add('activeBtn')
  }
}

inputs.forEach((input) => {
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
const dataSimulacoes = () => {
  cardShow.classList.add('show')
  const filtersSimulations = (data) => {
    
    data.forEach((item) => {

      const valorFinalBruto = document.querySelector('span[name="valorFinalBruto"]')
      valorFinalBruto.innerHTML = `R$ ${item.valorFinalBruto}`

      const aliquotaIR = document.querySelector('span[name="aliquotaIR"]')
      aliquotaIR.innerHTML = `${item.aliquotaIR}%`

      const valorPagoIR = document.querySelector(`span[name="valorPagoIR"]`)
      valorPagoIR.innerHTML = `R$ ${item.valorPagoIR}`

      const valorFinalLiquido = document.querySelector(`span[name="valorFinalLiquido"]`)
      valorFinalLiquido.innerHTML = `R$ ${item.valorFinalLiquido}`

      const valorTotalInvestido = document.querySelector(`span[name="valorTotalInvestido"]`)
      valorTotalInvestido.innerHTML = `R$ ${item.valorTotalInvestido}`

      const ganhoLiquido = document.querySelector(`span[name="ganhoLiquido"]`)
      ganhoLiquido.innerHTML = `R$ ${item.ganhoLiquido}`

    })


  }
  const getSimulacoes = () => {
    const url = `http://localhost:3000/simulacoes?tipoIndexacao=${tipoIndexacao}&tipoRendimento=${tipoRendimento}`
    fetch(url)
      .then((response) => {
        response.json()
          .then(data => filtersSimulations(data))
      })
  }

  getSimulacoes()
 

}
dataIndicadores()

btnClear.addEventListener('click', handleClear)
bntSimule.addEventListener('click', dataSimulacoes)





