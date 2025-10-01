const pokemonImage = document.querySelector(".pokemon-image");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonTypePrimary = document.querySelector(".pokemon-type-primary");
const pokemonTypeSecondary = document.querySelector(".pokemon-type-secondary");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonBG = document.querySelector(".background-image");

function roundHeight(feet) {
	var meters = feet * 0.1;
	return +meters.toFixed(2);
}

const form = document.querySelector(".search-form");
const search = document.querySelector(".search-input");

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		console.log(data);
		return data;
	}
};

const renderPokemon = async (pokemon) => {
	const data = await fetchPokemon(pokemon);
	console.log(data.height);

	if (data) {
		pokemonName.innerHTML = data.name;
		pokemonHeight.innerHTML = `Altura: ${roundHeight(data.height)} m`;

		var type1 = data["types"]["0"]["type"]["name"];
		var type2 = data["types"]["1"] ? data["types"]["1"]["type"]["name"] : null;

		// Remove todas as classes de tipo anteriores
		pokemonTypePrimary.className = "pokemon-type-primary";
		pokemonTypeSecondary.className = "pokemon-type-secondary";

		if (data["types"]["1"] == undefined) {
			pokemonTypePrimary.innerHTML = type1;
			pokemonTypePrimary.classList.add(type1);
			
			pokemonTypeSecondary.classList.remove("pokemon-type-secondary");
			pokemonTypeSecondary.classList.add("pokemon-type-undefined");
			pokemonTypeSecondary.innerHTML = " ";
		} else {
			pokemonTypePrimary.innerHTML = type1;
			pokemonTypePrimary.classList.add(type1);
			
			pokemonTypeSecondary.classList.remove("pokemon-type-undefined");
			pokemonTypeSecondary.classList.add("pokemon-type-secondary");
			pokemonTypeSecondary.innerHTML = type2;
			pokemonTypeSecondary.classList.add(type2);
		}

		pokemonBG.src = `./images/${type1}.png`;

		if (data.id < 9) {
			pokemonNumber.innerHTML = "00" + data.id;
		}
		if (data.id > 9 && data.id < 99) {
			pokemonNumber.innerHTML = "0" + data.id;
		}
		if (data.id > 99) {
			pokemonNumber.innerHTML = data.id;
		}
		// Sistema de fallback para garantir que sempre tenha uma imagem
		const imageSources = [
			// Tenta primeira opção: animação da geração V
			data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"],
			// Fallback 1: imagem estática da geração V
			data["sprites"]["versions"]["generation-v"]["black-white"]["front_default"],
			// Fallback 2: geração VII
			data["sprites"]["versions"]["generation-vii"]["ultra-sun-ultra-moon"]["front_default"],
			// Fallback 3: geração VIII
			data["sprites"]["versions"]["generation-viii"]["icons"]["front_default"],
			// Fallback 4: imagem oficial mais recente
			data["sprites"]["other"]["official-artwork"]["front_default"],
			// Fallback 5: imagem padrão da API
			data["sprites"]["front_default"],
			// Fallback 6: imagem home
			data["sprites"]["other"]["home"]["front_default"]
		];

		// Encontra a primeira imagem disponível
		let imageFound = false;
		for (let imgSrc of imageSources) {
			if (imgSrc) {
				pokemonImage.src = imgSrc;
				pokemonImage.style.display = "block";
				imageFound = true;
				break;
			}
		}

		// Se nenhuma imagem for encontrada
		if (!imageFound) {
			pokemonImage.style.display = "none";
		}
	} else {
		pokemonImage.style.display = "none";
		pokemonName.innerHTML = "Not found :c";
		pokemonNumber.innerHTML = "";
		pokemonTypePrimary.innerHTML = "";
		pokemonHeight.innerHTML = "";
	}
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(search.value.toLowerCase());
	search.value = "";
});

// Carrega o Pokémon #001 (Bulbasaur) ao iniciar a página
window.addEventListener("DOMContentLoaded", () => {
	renderPokemon(1);
});
