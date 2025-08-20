"use client";

import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHomeSmileLine } from "react-icons/ri";

const items = [
    {
        key: "/admin",
        label: <Link href="/admin">Dashboard</Link>,
    },
    {
        key: "/admin/courses",
        label: <Link href="/admin/products">Products</Link>,
        children: [
            {
                key: "/admin/products",
                label: <Link href="/admin/products">All products</Link>,
            },
            {
                key: "/admin/add-product",
                label: <Link href="/admin/add-product">Add product</Link>,
            },
        ],
    },
    {
        key: "e",
        label: "Categories",
        children: [
            {
                key: "/admin/categories",
                label: <Link href="/admin/categories">Categories</Link>,
            },
            {
                key: "/admin/sub-categories",
                label: <Link href="/admin/sub-categories">Sub categories</Link>,
            },
        ],
    },
    {
        key: "/admin/colors",
        label: <Link href="/admin/colors">Colors</Link>,
    },
    {
        key: "/admin/sizes",
        label: <Link href="/admin/sizes">Sizes</Link>,
    },
    {
        key: "/admin/brands",
        label: <Link href="/admin/brands">Brands</Link>,
    },
    {
        key: "/admin/reviews",
        label: <Link href="/admin/reviews">Reviews</Link>,
    },
];

function Layout({ children }) {
    const pathName = usePathname();

    return (
        <div>
            <div className="flex">
                <Menu
                    style={{
                        minHeight: "100vh",
                        width: "250px",
                    }}
                    defaultSelectedKeys={pathName}
                    mode="inline"
                    theme="dark"
                    items={items}
                />
                <div className="w-full">
                    <div className="py-3 px-6 shaodw">
                        <div className="flex gap-2">
                            <Link href="/" className="flex gap-1 items-center hover:text-blue-600">
                                <RiHomeSmileLine fontSize={20} /> Home
                            </Link>
                        </div>
                    </div>
                    <div className="p-10 bg-slate-100 h-full">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
