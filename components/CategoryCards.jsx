import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

function CategoryCards() {
  const { data, error, isLoading } = useSWR("/categories");

  if (error) {
    throw new Error("Something went wrong");
  }
  return (
    <>
      {data?.map((category, index) => {
        return (
          <div key={index}>
            <div className="p-3 items-center flex flex-col justify-center w-full h-full gap-3 group">
              <Link href="/">
                <div className="flex items-center justify-center bg-[#F4F4F4] rounded-full size-36">
                  <div className="size-20 relative">
                    <Image fill sizes="80px" src={category.image} alt="image" className=" rounded object-contain group-hover:scale-110 duration-300" />
                  </div>
                </div>
              </Link>
              <Link href="/shop" className="font-bold text-center hover:text-blue-600">
                {category.name}
              </Link>
            </div>
          </div>
        );
      })}
      {isLoading && (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className=" bg-gray-200 animate-pulse"></div>
        </div>
      )}
    </>
  );
}

export default CategoryCards;
