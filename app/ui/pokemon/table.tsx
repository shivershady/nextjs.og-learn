import { Pokemon } from "@/app/lib/pokemon-definitions";

export function PokemonTable({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {pokemon?.map(p => (
              <div key={p.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    {p.sprites.front_default && (
                      <img
                        src={p.sprites.front_default}
                        alt={p.name}
                        className="h-12 w-12"
                      />
                    )}
                    <p className="ml-4 text-sm capitalize">{p.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">#{p.id}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex gap-2">
                    {p.types.map(type => (
                      <span
                        key={type.type.name}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Image
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Types
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pokemon?.map(p => (
                <tr
                  key={p.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-4 sm:pl-6">
                    #{p.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {p.sprites.front_default && (
                      <img
                        src={p.sprites.front_default}
                        alt={p.name}
                        className="h-12 w-12"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 capitalize">
                    {p.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex gap-2">
                      {p.types.map(type => (
                        <span
                          key={type.type.name}
                          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
