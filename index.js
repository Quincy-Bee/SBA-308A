// Elements
const pokemonSelect = document.querySelector("#pokemonSelect");
const result = document.querySelector("#result");

// Get ALL Pokémon for dropdown
async function getAllPokemon() {
  const query = `
    query {
      getAllPokemon(take: 1025) {
        key
        species
        num
      }
    }
  `;

  const response = await fetch("https://graphqlpokemon.favware.tech/v8", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  return data.data.getAllPokemon;
}

// Get single Pokémon details
async function getPokemon(name) {
  const query = `
    query GetPokemon($name: String!) {
      getPokemon(pokemon: $name) {
        name
        num
        species
        types {
          name
        }
        height
        weight
      }
    }
  `;

  const response = await fetch("https://graphqlpokemon.favware.tech/v8", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { name }
    })
  });

  const data = await response.json();
  return data.data.getPokemon;
}

// dropdown
async function populateDropdown() {
  const pokemonList = await getAllPokemon();

  pokemonList.forEach((pokemon) => {
    const option = document.createElement("option");

    option.value = pokemon.key;
    option.textContent = pokemon.species;

    pokemonSelect.appendChild(option);
  });
}

populateDropdown();

// When user selects Pokémon
pokemonSelect.addEventListener("change", async (event) => {
  const name = event.target.value;

  if (!name) return;

  const pokemon = await getPokemon(name);

  result.innerHTML = `
    <div>
      <h2>${pokemon.name}</h2>

      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.num}.png"
        alt="${pokemon.name}"
      />

      <p>Species:</strong> ${pokemon.species}</p>
      <p>Types:</strong> ${pokemon.types.map(t => t.name).join(", ")}</p>
      <p>Height:</strong> ${pokemon.height}</p>
      <p>Weight:</strong> ${pokemon.weight}</p>
    </div>
  `;
});