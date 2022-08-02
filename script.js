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
            case "normal": pokemonType1.style.backgroundColor = '#aa9';
                break;
            case "fire": pokemonType1.style.backgroundColor = '#f42';
                break;
            case "water": pokemonType1.style.backgroundColor = '#39f';
                break;
            case "electric": pokemonType1.style.backgroundColor = '#fc3';
                break;
            case "grass": pokemonType1.style.backgroundColor = '#7c5';
                break;
            case "ice": pokemonType1.style.backgroundColor = '#6cf';
                break;
            case "fighting": pokemonType1.style.backgroundColor = '#b54';
                break;
            case "poison": pokemonType1.style.backgroundColor = '#a59';
                break;
            case "ground": pokemonType1.style.backgroundColor = '#db5';
                break;
            case "flying": pokemonType1.style.backgroundColor = '#89f';
                break;
            case "psychic": pokemonType1.style.backgroundColor = '#f59';
                break;
            case "bug": pokemonType1.style.backgroundColor = '#ab2';
                break;
            case "rock": pokemonType1.style.backgroundColor = '#ba6';
                break;
            case "ghost": pokemonType1.style.backgroundColor = '#66b';
                break;
            case "dragon": pokemonType1.style.backgroundColor = '#76e';
                break;
            case "dark": pokemonType1.style.backgroundColor = '#754';
                break;
            case "steel": pokemonType1.style.backgroundColor = '#aab';
                break;
            case "fairy": pokemonType1.style.backgroundColor = '#e9e';
                break;
        };

        if (data['types']['1'] !== undefined){
            switch (data['types']['1']['type']['name']) {
            case "normal": pokemonType2.style.backgroundColor = '#aa9';
                break;
            case "fire": pokemonType2.style.backgroundColor = '#f42';
                break;
            case "water": pokemonType2.style.backgroundColor = '#39f';
                break;
            case "electric": pokemonType2.style.backgroundColor = '#fc3';
                break;
            case "grass": pokemonType2.style.backgroundColor = '#7c5';
                break;
            case "ice": pokemonType2.style.backgroundColor = '#6cf';
                break;
            case "fighting": pokemonType2.style.backgroundColor = '#b54';
                break;
            case "poison": pokemonType2.style.backgroundColor = '#a59';
                break;
            case "ground": pokemonType2.style.backgroundColor = '#db5';
                break;
            case "flying": pokemonType2.style.backgroundColor = '#89f';
                break;
            case "psychic": pokemonType2.style.backgroundColor = '#f59';
                break;
            case "bug": pokemonType2.style.backgroundColor = '#ab2';
                break;
            case "rock": pokemonType2.style.backgroundColor = '#ba6';
                break;
            case "ghost": pokemonType2.style.backgroundColor = '#66b';
                break;
            case "dragon": pokemonType2.style.backgroundColor = '#76e';
                break;
            case "dark": pokemonType2.style.backgroundColor = '#754';
                break;
            case "steel": pokemonType2.style.backgroundColor = '#aab';
                break;
            case "fairy": pokemonType2.style.backgroundColor = '#e9e';
                break;
        };}


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


