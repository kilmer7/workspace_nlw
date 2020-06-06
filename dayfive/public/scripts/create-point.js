
function populateUFs(){
    //Procura pelo campo onde seleciona os estados
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //criando uma função anonima = function (){}
    //.then( res => res.json() ) == mesma coisa da de baixo, porém só pode ser usado assim quando está sozinho
    .then( (res) => {return res.json()} )
    .then(  states => {
        //faz uma repetição que adiciona todos os estados ao seletor de estados
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
        }
    })
    
}

populateUFs()

function getCities(event){
    //Procura pelo campo onde seleciona as cidades
    const citySelect = document.querySelector("select[name=city")
    //forma curta da chamada de seleção
    const stateInput = document.querySelector("[name=state")
    //pega o retorno do valor do evento
    const ufValue = event.target.value
    //alterando o valor do stateInput
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    //adiciona as cidades de um estado selecionado
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Garante as cidades de cada estado
    citySelect.innerHTML = "<option value>Selecione a Cidade</value>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        //habilita o botão da cidade que foi desabilitado anteriormente
        citySelect.disabled = false
    } )
}

//popula as cidades 
document
    //Procura pelo campo onde seleciona os estados
    .querySelector("select[name=uf]")
    //Executa a função por conta da troca ocorrida em 'name=uf'
    .addEventListener("change", getCities)


//Itens de Coleta

//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
//array dos itens selecionados
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe em javascript
    //add() ou remove() || para fazer ambos toggle()
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(  function(item){
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //se já estiver selecionado,
    if( alreadySelected >= 0 ){
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)
    //atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
}