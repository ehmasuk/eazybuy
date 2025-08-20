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
import SearchBox from "./SearchBox";
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
          <SearchBox />
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
