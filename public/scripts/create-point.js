
function populateUFs(){
    const ufSelect = document
    .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json())
    .then( states => {

        for( state of states ) {
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document
    .querySelector("select[name=city]")

    const stateInput = document
    .querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities => {
        
        for( city of cities ) {
            citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Items de coleta
// pegar todos os li´s

const itemToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target 

    // add or remove a class with javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existe items selecionados, se sim
    // pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    }) // isso será true ou false

    console.log(alreadySelected)

    // Se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        // Se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
}
