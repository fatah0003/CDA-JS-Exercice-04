const BASE_URL = "https://pokeapi.co/api/v2/"
const myId = document.querySelector("#id");
const myName = document.querySelector("#name");
const myWeight = document.querySelector("#weight");
const myHeight = document.querySelector("#height");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const myTypes = document.querySelector("#types")
const myAbilities = document.querySelector("#abilities")
const myImg = document.querySelector("img")
console.log(myImg);

function mapPokemon(data){
    return{
        name: data.name,
        id: data.id,
        weight: data.weight,
        height: data.height,
        types: data.types.map(t => t.type.name),
        abilities: data.abilities.map(a => a.ability.name),
        img: data.sprites.back_default
    }
    
    
}

async function getokemonByName (name){
    const response = await fetch(BASE_URL+"pokemon/"+name)
    const data = await response.json()
    return mapPokemon(data)
    
}
const pokemonByName = await getokemonByName("ditto")
// console.log(pokemonByName);


async function getpokemonById (id){
    const response = await fetch(BASE_URL+"pokemon/"+id)
    const data = await response.json()
    return mapPokemon(data)
    
}
let id = 1
const pokemonById = await getpokemonById(id)
console.log(pokemonById);

//Ajout des resultats dans le DOM
myId.textContent = pokemonById.id;
myName.textContent = pokemonById.name;
myWeight.textContent = `${pokemonById.weight} Kg`;
myHeight.textContent = `${pokemonById.height} m`;
myImg.src = `${pokemonById.img}`
pokemonById.types.forEach(type => {
    console.log(type);
    myTypes.textContent += `${type} `
});
pokemonById.abilities.forEach(ability => {
    console.log(ability);
    myAbilities.textContent += `${ability} `
  });
  

// Utiliser des boutons pour passer au prochain pokemon ou au précedant

next.addEventListener('click', async () => {
    if (id < 898) {
        id++; 
        const nextPokemon = await getpokemonById(id);
        console.log(nextPokemon);

        myId.textContent = nextPokemon.id;
        myName.textContent = nextPokemon.name;
        myWeight.textContent = `${nextPokemon.weight} Kg`;
        myHeight.textContent = `${nextPokemon.height} m`;
        myImg.src = `${nextPokemon.img}`
        myTypes.textContent = "";
myAbilities.textContent = "";

nextPokemon.types.forEach(type => {
    myTypes.textContent += `${type} `;
});

nextPokemon.abilities.forEach(ability => {
    myAbilities.textContent += `${ability} `;
});
    }
});

previous.addEventListener('click', async () => {
    if (id > 1) {
        id--;
        const previousPokemon = await getpokemonById(id);
        console.log(previousPokemon);

        myId.textContent = previousPokemon.id;
        myName.textContent = previousPokemon.name;
        myWeight.textContent = `${previousPokemon.weight} Kg`;
        myHeight.textContent = `${previousPokemon.height} m`;
myImg.src = `${previousPokemon.img}`
        myTypes.textContent = "";
        myAbilities.textContent = "";

        previousPokemon.types.forEach(type => {
            myTypes.textContent += `${type} `;
        });

        previousPokemon.abilities.forEach(ability => {
            myAbilities.textContent += `${ability} `;
        });
    }
});

