const pokemonImage = document.querySelector(".pokemon-image");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonTypePrimary = document.querySelector(".pokemon-type-primary");
const pokemonTypeSecondary = document.querySelector(".pokemon-type-secondary");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonWeight = document.querySelector(".pokemon-weight");
const pokemonBG = document.querySelector(".background-image");

// Elementos de status
const statHpBar = document.querySelector(".stat-hp");
const statHpValue = document.querySelector(".stat-hp-value");
const statAttackBar = document.querySelector(".stat-attack");
const statAttackValue = document.querySelector(".stat-attack-value");
const statDefenseBar = document.querySelector(".stat-defense");
const statDefenseValue = document.querySelector(".stat-defense-value");
const statSpatkBar = document.querySelector(".stat-spatk");
const statSpatkValue = document.querySelector(".stat-spatk-value");
const statSpdefBar = document.querySelector(".stat-spdef");
const statSpdefValue = document.querySelector(".stat-spdef-value");
const statSpeedBar = document.querySelector(".stat-speed");
const statSpeedValue = document.querySelector(".stat-speed-value");

function roundHeight(decimeters) {
	// A API retorna altura em decímetros (1 dm = 0.1 m)
	var meters = decimeters * 0.1;
	return meters.toFixed(2);
}

function roundWeight(hectograms) {
	// A API retorna peso em hectogramas (1 hg = 0.1 kg)
	var kilograms = hectograms * 0.1;
	return kilograms.toFixed(2);
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
		pokemonWeight.innerHTML = `Peso: ${roundWeight(data.weight)} kg`;

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

		// Renderiza os status
		const stats = data.stats;
		const maxStatValue = 255; // Valor máximo de stat no Pokémon
		
		// HP
		const hpValue = stats[0].base_stat;
		statHpValue.innerHTML = hpValue;
		statHpBar.style.width = `${(hpValue / maxStatValue) * 100}%`;
		
		// Attack
		const attackValue = stats[1].base_stat;
		statAttackValue.innerHTML = attackValue;
		statAttackBar.style.width = `${(attackValue / maxStatValue) * 100}%`;
		
		// Defense
		const defenseValue = stats[2].base_stat;
		statDefenseValue.innerHTML = defenseValue;
		statDefenseBar.style.width = `${(defenseValue / maxStatValue) * 100}%`;
		
		// Special Attack
		const spatkValue = stats[3].base_stat;
		statSpatkValue.innerHTML = spatkValue;
		statSpatkBar.style.width = `${(spatkValue / maxStatValue) * 100}%`;
		
		// Special Defense
		const spdefValue = stats[4].base_stat;
		statSpdefValue.innerHTML = spdefValue;
		statSpdefBar.style.width = `${(spdefValue / maxStatValue) * 100}%`;
		
		// Speed
		const speedValue = stats[5].base_stat;
		statSpeedValue.innerHTML = speedValue;
		statSpeedBar.style.width = `${(speedValue / maxStatValue) * 100}%`;

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
