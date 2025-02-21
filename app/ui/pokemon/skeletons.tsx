export function PokemonTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="mb-2 w-full rounded-md bg-white p-4 animate-pulse"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div className="w-1/4 h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            {/* <thead className="rounded-lg text-left text-sm font-normal">
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
            </thead> */}
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="w-24 h-4 bg-gray-200 rounded" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex gap-2">
                      <div className="w-16 h-6 bg-gray-200 rounded-full" />
                      <div className="w-16 h-6 bg-gray-200 rounded-full" />
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
