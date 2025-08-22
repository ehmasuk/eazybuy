"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { PiDress } from "react-icons/pi";

function layout({ children }) {


    return (
        <div>
            <div className="py-10">
                <div className="container container-fluid relative">
                    <div className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-blue-600 bg-center bg-no-repeat bg-cover" />
                </div>
                {/* body */}
                <div className="container relative md:mt-24 mt-16">
                    <div className="md:flex">
                        <div className="lg:w-1/4 md:w-1/3 md:px-3">
                            <div className="relative md:-mt-48 -mt-32">
                                <div className="p-6 rounded-md shadow bg-white">
                                    <div className="profile-pic text-center mb-5">
                                        <input id="pro-img" name="profile-image" type="file" className="hidden" onchange="loadFile(event)" />
                                        <div>

                                            <div className="mt-4">
                                                <h5 className="text-lg font-semibold">Jesus Zamora</h5>
                                                <p className="text-slate-800">jesus@hotmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100">
                                        <ul className="list-none space-y-3">
                                            <li className="active group">
                                                <Link href="/profile" className="navbar-link group-[&.active]:text-blue-600 text-slate-800 hover:text-blue-600 flex items-center py-2 rounded">
                                                    <span className="me-2 mb-0">
                                                        <CgProfile fontSize={20} />
                                                    </span>
                                                    <h6 className="mb-0 font-medium">Profile info</h6>
                                                </Link>
                                            </li>
                                            <li className="group">
                                                <Link href="/profile/orders" className="navbar-link group-[&.active]:text-blue-600 text-slate-800 hover:text-blue-600 flex items-center py-2 rounded">
                                                    <span className="me-2 mb-0">
                                                        <PiDress fontSize={20} />
                                                    </span>
                                                    <h6 className="mb-0 font-medium">Orders</h6>
                                                </Link>
                                            </li>
                                            <li className="group">
                                                <Link href="/profile/cart" className="navbar-link group-[&.active]:text-blue-600 text-slate-800 hover:text-blue-600 flex items-center py-2 rounded">
                                                    <span className="me-2 mb-0">
                                                        <FiShoppingCart fontSize={20} />
                                                    </span>
                                                    <h6 className="mb-0 font-medium">Cart items</h6>
                                                </Link>
                                            </li>
                                            <li className="group">
                                                <button className="navbar-link group-[&.active]:text-blue-600 text-slate-800 hover:text-blue-600 flex items-center py-2 rounded">
                                                    <span className="me-2 mb-0">
                                                        <IoIosLogOut fontSize={20} />
                                                    </span>
                                                    <h6 className="mb-0 font-medium">Logout</h6>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default layout;
