"use client";
import SubCategoriesForm from "@/components/admin/SubCategoriesForm";
import Table from "@/components/Table";
import useSWR from "swr";

function SubCategories() {
  const { data: allCategories } = useSWR("/categories");
  const { data: allSubCategories } = useSWR("/subcategories");

  const categoriesSelect = allCategories?.map((category) => {
    return { value: category.id, label: category.name };
  });

  return (
    <div>
      <div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <SubCategoriesForm categoriesSelect={categoriesSelect} />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
              <div className="overflow-scroll 2xl:overflow-visible">
                <div className="w-[975px] 2xl:w-full">
                  <section className="container px-4 mx-auto">
                    <div className="flex items-center gap-x-3">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-white">Sub categories</h2>
                      <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allSubCategories?.length}</span>
                    </div>
                    <div className="flex flex-col mt-6">
                      <Table
                        data={allSubCategories}
                        image={{ value: ["image"] }}
                        rows={[
                          { label: "Name", value: ["name"] },
                          { label: "Parent", value: ["parentCategory", "name"] },
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
    </div>
  );
}

export default SubCategories;
