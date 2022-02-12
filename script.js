
//pegando o botão e adicionando um evento de limpar campos
const btnClear = document.querySelector('.btn-clear')
const paragraph = document.querySelectorAll('p')
const inputs = [...document.querySelectorAll('.isvalid')]

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
btnClear.addEventListener('click', handleClear)

//função que valida os campos

const bntSimule = document.querySelector('.btn-simule')

function handleValiDate(e) {
    const value = e.target.value
    const parent = e.target.parentNode
    const feedbackError = parent.querySelector('p')

    if (!value || isNaN(value)) {
        parent.classList.add('error')
        feedbackError.innerText = 'aporte deve ser um número'
    } else {
        parent.classList.remove('error')
        feedbackError.innerText = ''

    }
}
inputs.forEach((input) => {
    input.addEventListener('blur', handleValiDate)
})

const dataIndicadores = () => {

    function filtersInputs(data) {
        data.forEach(({ nome, valor }) => {
            const input = document.querySelector(`input[name="${nome}"]`)
            input.value = `${valor}%`

        })
    }
    const url = ('http://localhost:3000/indicadores')
    fetch(url)
        .then(response => {
            response.json()
                .then(data => filtersInputs(data))
        })
}
const dataSimulacoes = () => {
    const getSimulacoes = () => {
        const url = 'http://localhost:3000/simulacoes'
        fetch(url)
            .then(response => {
                response.json()
            .then(data => console.log(data))
            })
    }
    getSimulacoes()
}
bntSimule.addEventListener('click', dataSimulacoes)



