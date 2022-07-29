const pokemonImage = document.querySelector('.pokemon_img_data');
const pokemonNumber = document.querySelector('.pokemon_number_data');
const pokemonName = document.querySelector('.pokemon_name_data');
const pokemonType1 = document.querySelector('.type_pokemon1');
const pokemonType2 = document.querySelector('.type_pokemon2');
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


    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonHeight.innerHTML = "Altura: " + (data.height * 0.1) + "m";

        if (data['types']['1'] == undefined) {
            pokemonType1.innerHTML = data['types']['0']['type']['name'];
            pokemonType2.classList.remove('type_pokemon2');
            pokemonType2.innerHTML = " ";
        }
        else {
            pokemonType1.innerHTML = data['types']['0']['type']['name'];
            pokemonType2.classList.add('type_pokemon2');
            pokemonType2.innerHTML = data['types']['1']['type']['name'];
        };

        switch (data['types']['0']['type']['name']) {
            case "grass": add.style.type_pokemon1.background-color:#a59;
                break;
            case "poison": pokemonType1.innerHTML = "EU TO DOIDO OU NÃO";
                break;
        };


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


