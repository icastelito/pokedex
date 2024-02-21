const pokemonImage = document.querySelector(".pokemon_img_data");
const pokemonNumber = document.querySelector(".pokemon_number_data");
const pokemonName = document.querySelector(".pokemon_name_data");
const pokemonType1 = document.querySelector(".type_pokemon1");
const pokemonType2 = document.querySelector(".type_pokemon2");
const pokemonHeight = document.querySelector(".height");
const pokemonBG = document.querySelector(".bg");

function roundHeight(feet) {
  var meters = feet * 0.1;
  return +meters.toFixed(2);
}

const form = document.querySelector(".busca");
const search = document.querySelector(".search");

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);
  console.log(data.height);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonHeight.innerHTML = `Altura: ${roundHeight(data.height)} m`;

    if (data["types"]["1"] == undefined) {
      pokemonType1.innerHTML = data["types"]["0"]["type"]["name"];
      pokemonType2.classList.remove("type_pokemon2");
      pokemonType2.classList.add("type_pokermon_undefined");
      pokemonType2.innerHTML = " ";
    } else {
      pokemonType1.innerHTML = data["types"]["0"]["type"]["name"];
      pokemonType2.classList.remove("type_pokermon_undefined");
      pokemonType2.classList.add("type_pokemon2");
      pokemonType2.innerHTML = data["types"]["1"]["type"]["name"];
    }

    var type1 = data["types"]["0"]["type"]["name"];
    pokemonBG.src = `./images/${type1}.webp`;
    var type2 = data["types"]["1"] ? data["types"]["1"]["type"]["name"] : null;

    pokemonType1.style.backgroundColor = `var(--${type1})`;

    if (type2) {
      pokemonType2.style.backgroundColor = `var(--${type2})`;
    } else {
      pokemonType2.style.backgroundColor = "transparent";
    }

    if (data.id < 9) {
      pokemonNumber.innerHTML = "00" + data.id;
    }
    if (data.id > 9 && data.id < 99) {
      pokemonNumber.innerHTML = "0" + data.id;
    }
    if (data.id > 99) {
      pokemonNumber.innerHTML = data.id;
    }
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";
    pokemonType.innerHTML = "";
    pokemonHeight.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(search.value.toLowerCase());
  search.value = "";
});
