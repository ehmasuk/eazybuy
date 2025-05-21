"use client"

import { opneSideCart } from "@/redux/CartSlice";
import { Badge } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import HeaderTop from "./HeaderTop";
import LoginPopup from "./LoginPopup";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect, useState } from "react";

function Header() {
    const dispatch = useDispatch();

    const {cartItems} = useSelector((reducers) => reducers.CartSlice);

    const [isReady,setIsReady] = useState(false);

    useEffect(()=>{
        setIsReady(true)
    },[])

    const { data: session,status } = useSession();

    return (
        <>
            <HeaderTop />
            <nav className="shadow">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-4">
                    <div>
                        <Logo />
                    </div>
                    <div className="hidden lg:block">
                        <form className="min-w-96">
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
                                <button type="submit" className="text-sm text-white absolute rounded px-2 py-1.5 end-2 bottom-1/2 translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className="flex items-center gap-8">
                            <div className="relative group">
                                {status == 'authenticated' ? (
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
                                        <LoginPopup />
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
