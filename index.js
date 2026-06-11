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
        sprite
        shinySprite
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

// Populate dropdown
async function populateDropdown() {
  const pokemonList = await getAllPokemon();

  pokemonList.forEach((pokemon) => {
    const option = document.createElement("option");

    option.value = pokemon.species;
    option.textContent = pokemon.species;

    pokemonSelect.appendChild(option);
  });
}

populateDropdown();

// When user selects a Pokémon
pokemonSelect.addEventListener("change", async (event) => {
  const name = event.target.value;

  if (!name) return;

  const pokemon = await getPokemon(name);

  console.log(pokemon);

  result.innerHTML = `
    <div>
      <h2>${pokemon.name}</h2>
      <img
        src="${pokemon.sprite || pokemon.shinySprite}"
        alt="${pokemon.name}"
        style="width: 200px;"
      />
      <p><strong>Species:</strong> ${pokemon.species}</p>
      <p><strong>Types:</strong> ${pokemon.types.map(t => t.name).join(", ")}</p>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
    </div>
  `;
});