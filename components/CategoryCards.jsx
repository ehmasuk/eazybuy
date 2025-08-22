import Image from "next/image";
import Link from "next/link";

function CategoryCards({ data }) {
  return (
    <>
      {data?.map((item, index) => {
        const category = item.category || item.subCategory || item;
        return (
          <div key={index}>
            <div className="p-3 items-center flex flex-col justify-center w-full h-full gap-3 group">
              <Link href={`/shop?category=${category.slug}`}>
                <div className="flex items-center justify-center bg-[#F4F4F4] rounded-full size-36">
                  <div className="size-20 relative">
                    <Image fill sizes="80px" src={category.image} alt="image" className=" rounded object-contain group-hover:scale-110 duration-300" />
                  </div>
                </div>
              </Link>
              <Link href={`/shop?category=${category.slug}`} className="font-bold text-center hover:text-blue-600">
                {category.name}
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CategoryCards;
