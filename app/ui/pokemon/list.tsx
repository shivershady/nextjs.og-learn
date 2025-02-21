"use client";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { Pokemon } from "@/app/lib/pokemon-definitions";
import { PokemonTable } from "@/app/ui/pokemon/table";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { pokemonApi } from "@/app/lib/pokemon-data";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

interface PokemonListProps {
  initialPokemon: Pokemon[];
}

function PokemonListContent({ initialPokemon }: PokemonListProps) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: async ({ pageParam }) => {
        return pokemonApi.getPokemonListWithDetails(pageParam);
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

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const allPokemon = data?.pages.flat() ?? [];

  return (
    <div>
      <PokemonTable pokemon={allPokemon} />

      <div ref={ref} className="flex justify-center p-4">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonListContent initialPokemon={initialPokemon} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
