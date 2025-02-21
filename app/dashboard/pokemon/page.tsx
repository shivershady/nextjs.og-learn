import { Metadata } from "next";
import PokemonList from "@/app/ui/pokemon/list";
import { PokemonTableSkeleton } from "@/app/ui/pokemon/skeletons";
import { Suspense } from "react";
import { getInitialPokemon } from "@/app/lib/pokemon-data";
import { lusitana } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Pokemon",
};

export default async function PokemonPage() {
  const initialPokemon = await getInitialPokemon();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pokemon</h1>
      </div>
      <Suspense fallback={<PokemonTableSkeleton />}>
        <PokemonList initialPokemon={initialPokemon} />
      </Suspense>
    </div>
  );
}
