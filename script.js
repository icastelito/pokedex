const pokemonImage = document.querySelector('.pokemon_img_data');
const pokemonNumber = document.querySelector('.pokemon_number_data');
const pokemonName = document.querySelector('.pokemon_name_data');
const pokemonType = document.querySelector('.type_pokemon');
const pokemonHeight = document.querySelector('.height');

const form = document.querySelector('.busca');
const search = document.querySelector('.search');


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);


    if(data){
        pokemonName.innerHTML = data.name;
        pokemonHeight.innerHTML = "Altura: "+ (data.height * 0.1) + "m";
        if (data['types']['1'] == undefined){ pokemonType.innerHTML = "Tipo: " + data['types']['0']['type']['name'] } 
            else  { pokemonType.innerHTML = "Tipo: " + data['types']['0']['type']['name'] + " / " + data['types']['1']['type']['name'] };
        if (data.id < 9) { pokemonNumber.innerHTML = "00" + data.id };
        if (data.id > 9 && data.id < 99) { pokemonNumber.innerHTML = "0" + data.id };
        if (data.id > 99) { pokemonNumber.innerHTML = data.id };
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    } else { 
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
        pokemonHeight.innerHTML = '';
    };
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
    search.value = '';
});


