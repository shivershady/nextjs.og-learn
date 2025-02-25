import {
  Pokemon,
  PokemonList,
  PokemonListSchema,
  PokemonSchema,
} from "./pokemon-definitions";

import ky from "ky";

export class PokemonApi {
  private readonly api: typeof ky;
  private readonly baseUrl = "https://pokeapi.co/api/v2";
  private pokemonCache: Map<string, Pokemon> = new Map();

  constructor() {
    this.api = ky.create({
      prefixUrl: this.baseUrl,
      timeout: 30000,
      retry: {
        limit: 2,
        methods: ["get"],
      },
    });
  }

  async getPokemonList(offset: number = 0): Promise<PokemonList> {
    const response = await this.api
      .get(`pokemon?offset=${offset}&limit=50`)
      .json();
    return PokemonListSchema.parse(response);
  }

  async getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
    const cacheKey = String(nameOrId);
    if (this.pokemonCache.has(cacheKey)) {
      return this.pokemonCache.get(cacheKey)!;
    }

    const response = await this.api.get(`pokemon/${nameOrId}`).json();
    const pokemon = PokemonSchema.parse(response);
    this.pokemonCache.set(cacheKey, pokemon);
    return pokemon;
  }

  async getPokemonListWithDetails(offset: number = 0): Promise<Pokemon[]> {
    const list = await this.getPokemonList(offset);
    const pokemonPromises = list.results.map(pokemon =>
      this.getPokemonDetails(pokemon.name)
    );
    return Promise.all(pokemonPromises);
  }
}
