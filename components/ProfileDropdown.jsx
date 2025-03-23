"use client";

import { logoutAction } from "@/actions/authActions";
import { message } from "antd";
import Image from "next/image";

function ProfileDropdown({ session }) {
    const handleLogout = async () => {
        await logoutAction();
        window.location.reload();
        message.success("Logout successfully");
    };

    return (
        <div
            className="
        absolute invisible opacity-0 group-hover:opacity-100 group-hover:visible overflow-hidden right-0 top-full bg-white shadow-lg z-10 duration-500 ease-in-out w-[280px] rounded-md p-5"
        >
            <div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
                <div>
                    <Image className="w-[50px] h-[50px] rounded-md" width={100} height={100} src="https://html.hixstudio.net/ebazer/assets/img/users/user-10.jpg" alt="" />
                </div>
                <div>
                    <h5 className="text-base mb-1 leading-none">{session?.user?.name}</h5>
                    <p className="mb-0 text-tiny leading-none">{session?.user?.email}</p>
                </div>
            </div>
            <ul>
                {session?.user?.isAdmin && (
                    <li>
                        <a href="/admin" className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-slate-800 text-base">
                            Admin Panel
                        </a>
                    </li>
                )}
                <li>
                    <a href="#" className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-slate-800 text-base">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-slate-800 text-base">
                        Account Settings
                    </a>
                </li>
                <li>
                    <a href="#" onClick={handleLogout} className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-slate-800 text-base">
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default ProfileDropdown;
