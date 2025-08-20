"use client";

import { opneSideCart } from "@/redux/CartSlice";
import { Badge, Rate } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((reducers) => reducers.CartSlice);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const { data: session, status } = useSession();

  return (
    <>
      <HeaderTop />
      <nav className="shadow">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-4">
          <div>
            <Logo />
          </div>
          <div className="hidden lg:block">
            <div className="min-w-96">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoSearchSharp className="text-gray-500" fontSize={20} />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-4 outline-none py-3 ps-10 text-sm text-gray-900 border border-blue-300 rounded-lg bg-gray-50"
                  placeholder="Search products..."
                  required
                />

                <div className="w-full absolute z-50 left-0 top-14 bg-white shadow-lg p-1 max-h-[300px] overflow-auto search_dropdown">
                  <div className="flex flex-col gap-3">
                    <Link href="/shop">
                      <span className="flex items-start gap-4 p-4 rounded-md bg-background hover:bg-muted/50 hover:bg-blue-50 transition">
                        <Image src="" alt="title" fill className="rounded-md size-12 object-cover" />
                        <div className="flex-1">
                          <h3 className="font-medium line-clamp-2">Iphone 16 pro max</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Category <b>Electronics</b>
                          </p>
                          <Rate allowHalf disabled defaultValue={4.5} className="[&_*]:text-sm !-mt-1" />
                        </div>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-8">
              <div className="relative group">
                {status == "authenticated" ? (
                  <>
                    <Link href="/profile">
                      <AiOutlineUser className="hover:text-blue-600 " fontSize={25} />
                    </Link>
                    <ProfileDropdown session={session} />
                  </>
                ) : (
                  <>
                    <Link href="/account">
                      <AiOutlineUser className="hover:text-blue-600 " fontSize={25} />
                    </Link>
                  </>
                )}
              </div>
              <Link className="flex items-center" href="/wishlist">
                <Badge count={0} color="blue">
                  <GoHeart className="hover:text-blue-600" fontSize={25} />
                </Badge>
              </Link>
              <button className="flex items-center" onClick={() => dispatch(opneSideCart())}>
                <Badge count={isReady && cartItems?.length} color="blue">
                  <RiShoppingCartLine className="hover:text-blue-600" fontSize={23} />
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
