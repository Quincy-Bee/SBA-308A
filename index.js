//get elements fro pokémon API
const input = document.querySelector("#pokemonInput");
const btn = document.querySelector("#searchBtn");
const result = document.querySelector("#result");

async function getPokemon(name) {
    const query = `
    query GetPokemon($name; String!) {
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

const response = await fetch("https:graphqlpokemon.favware.tech/", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        query,
        variables: {
            name
        }
    })
});

const data = await response.json();

return data.data.getPokemon;
}

btn.addEventListener("click", async () => {
    const name = input.ariaValueMax.toLowerCase().trim();

    const pokemon = await getPokemon(name):

    if (!pokemon) {
        result.innerHTML = `<p>Pokémon not found</p>`;
        return;
    }

    result.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprite}" alt="${pokemon.name}" />
    <p><strong>Species:</strong> ${pokemon.species}</p>