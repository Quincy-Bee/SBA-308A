// Elements
const input = document.querySelector("#pokemonInput");
const btn = document.querySelector("#searchBtn");
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

  const response = await fetch("https://graphqlpokemon.favware.tech/", {
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

// Button click handler
btn.addEventListener("click", async () => {
  const name = input.value.toLowerCase().trim();

  if (!name) {
    result.innerHTML = `<p>Please enter a Pokémon name</p>`;
    return;
  }

  result.innerHTML = `<p>Loading...</p>`;

  const pokemon = await getPokemon(name);

  if (!pokemon) {
    result.innerHTML = `<p>Pokémon not found</p>`;
    return;
  }

  result.innerHTML = `
    <div class="card mx-auto" style="width: 18rem;">
      <img src="${pokemon.sprite}" class="card-img-top" alt="${pokemon.name}" />
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">
          <strong>Species:</strong> ${pokemon.species}<br>
          <strong>Types:</strong> ${pokemon.types.join(", ")}<br>
          <strong>Height:</strong> ${pokemon.height}<br>
          <strong>Weight:</strong> ${pokemon.weight}
        </p>
      </div>
    </div>
  `;
});