import Image from "next/image";
import { CgEye } from "react-icons/cg";
import { HiOutlineTrash } from "react-icons/hi2";
import { LiaEditSolid } from "react-icons/lia";
function Table({ data, rows, image = false, actions = false }) {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                {rows.map((row, index) => {
                  return (
                    <th key={index} scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-black">
                      {row.label}
                    </th>
                  );
                })}
                {actions && (
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-black">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((item, index) => {
                return (
                  <tr key={index}>
                    {rows.map((row, index) => {
                      if (row.label === "Name") {
                        return (
                          <td key={index} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                {image && <Image width={40} height={40} className="object-contain shadow-xl" src={image.value.reduce((acc, key) => (acc ? acc[key] : undefined), item)} alt="image" />}
                                <div>
                                  <h2 className="text-sm text-wrap text-gray-800 ">{row.value.reduce((acc, key) => (acc ? acc[key] : undefined), item)}</h2>
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      } else {
                        return (
                          <td key={index} className="px-4 py-4 text-sm text-black">
                            {
                              row.value.reduce((acc, key) => (acc ? acc[key] : undefined), item)
                              // row.value[1] ? item[row.value[0]][row.value[1]] : item[row.value[0]]
                            }
                          </td>
                        );
                      }
                    })}

                    {actions && (
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-items duration-200 hover:text-red-500 focus:outline-none">
                            <HiOutlineTrash fontSize={20} />
                          </button>
                          <button className="text-gray-500 transition-items duration-200 hover:text-yellow-500 focus:outline-none">
                            <LiaEditSolid fontSize={20} />
                          </button>
                          <button className="text-gray-500 transition-items duration-200 hover:text-yellow-500 focus:outline-none">
                            <CgEye fontSize={20} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
