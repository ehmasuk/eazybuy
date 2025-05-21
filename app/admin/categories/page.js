"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import Table from "@/components/Table";
import useSWR from "swr";

function Categories() {
  const { data: allCategories, error, isLoading } = useSWR("/categories");

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <CategoryForm />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
            <div className="overflow-scroll 2xl:overflow-visible">
              <div className="w-[975px] 2xl:w-full">
                <section className="container px-4 mx-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allCategories?.length}</span>
                  </div>
                  <div className="flex flex-col mt-6">
                    <Table
                      data={allCategories}
                      image={{ value: ["image"] }}
                      rows={[
                        { label: "Name", value: ["name"] },
                        { label: "Slug", value: ["slug"] },
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

export default Categories;
