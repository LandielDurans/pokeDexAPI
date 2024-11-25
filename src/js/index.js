const pokemon_name = document.querySelector('.pokemon_name')
const pokemon_image = document.querySelector('.pokemon_image')
const pokemon_number = document.querySelector('.pokemon_number')
const pokemon_ability = document.querySelector('.ability')
const form = document.querySelector('.form')
const input_search = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let pokemonCounter = 1

const fetchAPI = async (pokemon) => {
    pokemon_name.innerHTML = 'Carregando...'
    pokemon_number.innerHTML = ''

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchAPI(pokemon)
    if (data) {
        pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemon_name.innerHTML = data.name
        pokemon_number.innerHTML = data.id
        pokemon_ability.innerHTML = data['abilities']['0']['ability']['name']
        input_search.value = ''
        pokemonCounter = data.id
    } else {
        pokemon_name.innerHTML = 'Não encontrado :c'
        pokemon_number.innerHTML = ''
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    renderPokemon(input_search.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (pokemonCounter > 1) {
        pokemonCounter -= 1
        renderPokemon(pokemonCounter)
    }
})

buttonNext.addEventListener('click', () => {
    pokemonCounter += 1
    renderPokemon(pokemonCounter)
})

renderPokemon(pokemonCounter)