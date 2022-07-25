const pokemonImage = document.querySelector('.pokemon_img_data');
const pokemonNumber = document.querySelector('.pokemon_number_data')
const pokemonName = document.querySelector('.pokemon_name_data')

const form = document.querySelector('.busca');
const search = document.querySelector('.search');


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;}
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
    search.value='';
});


