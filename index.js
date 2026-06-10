// Elements
const input = document.querySelector("#pokemonInput");
const pokemonSelect = document.querySelector("#pokemonSelect");
const result = document.querySelector("#result");

// Fetch Pokémon from GraphQL API
async function getPokemon(name) {
  const query = `
    query GetPokemon($name: String!) {
      getPokemon(pokemon: $name) {
        name
        sprite
        species
        types
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

pokemonSelect.addEventListener("change", async (event) => {
  const name = event.target.value;

  if (!name) return;

  const pokemon = await getPokemon(name);

  result.innerHTML = `
    <div class="card">
      <img src="${pokemon.sprite}" alt="${pokemon.name}">
      <h2>${pokemon.name}</h2>
      <p>Species: ${pokemon.species}</p>
      <p>Types: ${pokemon.types.join(", ")}</p>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
    </div>
  `;
});