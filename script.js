const pokemonImage = document.querySelector(".pokemon-image");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonTypePrimary = document.querySelector(".pokemon-type-primary");
const pokemonTypeSecondary = document.querySelector(".pokemon-type-secondary");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonWeight = document.querySelector(".pokemon-weight");
const pokemonBG = document.querySelector(".background-image");

// Botões de navegação
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnConfig = document.querySelector(".btn-config");

// Modal de configurações
const configModal = document.getElementById("configModal");
const closeModal = document.getElementById("closeModal");
const spriteSelect = document.getElementById("spriteSelect");

// Variável para rastrear o Pokémon atual
let currentPokemonId = 1;

// Preferência de sprite (padrão: animado)
let spritePreference = localStorage.getItem("spritePreference") || "animated";

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
		// Atualiza o ID atual do Pokémon
		currentPokemonId = data.id;

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

		// Função para obter sprite baseado na preferência
		const getPreferredSprite = (sprites) => {
			const spriteOptions = {
				animated: sprites["versions"]["generation-v"]["black-white"]["animated"]["front_default"],
				gen5: sprites["versions"]["generation-v"]["black-white"]["front_default"],
				gen7: sprites["versions"]["generation-vii"]["ultra-sun-ultra-moon"]["front_default"],
				official: sprites["other"]["official-artwork"]["front_default"],
				home: sprites["other"]["home"]["front_default"],
				default: sprites["front_default"],
			};
			return spriteOptions[spritePreference];
		};

		// Sistema de fallback para garantir que sempre tenha uma imagem
		const imageSources = [
			// Tenta primeiro a preferência do usuário
			getPreferredSprite(data.sprites),
			// Fallbacks
			data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"],
			data["sprites"]["versions"]["generation-v"]["black-white"]["front_default"],
			data["sprites"]["versions"]["generation-vii"]["ultra-sun-ultra-moon"]["front_default"],
			data["sprites"]["versions"]["generation-viii"]["icons"]["front_default"],
			data["sprites"]["other"]["official-artwork"]["front_default"],
			data["sprites"]["front_default"],
			data["sprites"]["other"]["home"]["front_default"],
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

// Navegação entre Pokémon
btnPrev.addEventListener("click", () => {
	if (currentPokemonId > 1) {
		renderPokemon(currentPokemonId - 1);
	}
});

btnNext.addEventListener("click", () => {
	renderPokemon(currentPokemonId + 1);
});

// Modal de configurações
btnConfig.addEventListener("click", () => {
	spriteSelect.value = spritePreference;
	configModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
	configModal.classList.remove("active");
});

// Fechar modal ao clicar fora dele
configModal.addEventListener("click", (event) => {
	if (event.target === configModal) {
		configModal.classList.remove("active");
	}
});

// Salvar preferência de sprite
spriteSelect.addEventListener("change", (event) => {
	spritePreference = event.target.value;
	localStorage.setItem("spritePreference", spritePreference);
	// Recarrega o Pokémon atual com o novo sprite
	renderPokemon(currentPokemonId);
});

// Carrega o Pokémon #001 (Bulbasaur) ao iniciar a página
window.addEventListener("DOMContentLoaded", () => {
	renderPokemon(1);
});
