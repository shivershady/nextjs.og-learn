"use client";

import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { pokemonApi } from "@/app/lib/pokemon-data";
import { Pokemon } from "@/app/lib/pokemon-definitions";
import { PokemonTable } from "@/app/ui/pokemon/table";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonTableSkeleton } from "./skeletons";

const pokemonQueryOptions = (initialPokemon: Pokemon[]) =>
  infiniteQueryOptions({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      const list = await pokemonApi.getPokemonList(pageParam);
      const pokemonPromises = list.results.map(pokemon =>
        pokemonApi.getPokemonDetails(pokemon.name)
      );
      return Promise.all(pokemonPromises);
    },
    initialData: {
      pages: [initialPokemon],
      pageParams: [0],
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * 50;
    },
  });

interface PokemonListProps {
  initialPokemon: Pokemon[];
}

function PokemonListContent({ initialPokemon }: PokemonListProps) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    pokemonQueryOptions(initialPokemon)
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const allPokemon = data?.pages.flat() ?? [];

  return (
    <div>
      <PokemonTable pokemon={allPokemon} />
      <div ref={ref}>{isFetchingNextPage && <PokemonTableSkeleton />}</div>
    </div>
  );
}

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  return <PokemonListContent initialPokemon={initialPokemon} />;
}
