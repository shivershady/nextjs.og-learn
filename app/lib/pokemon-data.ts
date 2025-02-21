import { PokemonApi } from "./pokemon-api";

export const pokemonApi = new PokemonApi();

export async function getInitialPokemon() {
  return pokemonApi.getPokemonListWithDetails(0);
}
