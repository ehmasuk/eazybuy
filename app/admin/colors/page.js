"use client";
import ColorsForm from "@/components/admin/ColorsForm";
import Table from "@/components/Table";
import useSWR from "swr";
function Colors() {
  const { data: allColors } = useSWR("/colors");

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <ColorsForm />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
            <div className="overflow-scroll 2xl:overflow-visible">
              <div className="w-[975px] 2xl:w-full">
                <section className="container px-4 mx-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">Colors</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allColors?.length}</span>
                  </div>
                  <div className="flex flex-col mt-6">
                    <Table
                      data={allColors}
                      rows={[
                        { label: "Name", value: ["name"] },
                        { label: "Code", value: ["code"] },
                      ]}
                      actions={true}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colors;
