import Link from "next/link";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";

function HeaderTop() {
    return (
        <div className="py-3 border-b border-slate-200">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4">
                <div className="flex items-center gap-5">
                    <a href="#" className="hover:text-blue-600">
                        <SlSocialFacebook fontSize={20} />
                    </a>
                    <a href="#" className="hover:text-blue-600">
                        <FaInstagram fontSize={20} />
                    </a>
                    <a href="#" className="hover:text-blue-600">
                        <AiOutlineYoutube fontSize={25} />
                    </a>
                </div>
                <div className="flex items-center gap-8">
                    <Link href="/shop" className="text-sm hover:text-blue-600">
                        Shop
                    </Link>
                    <Link href="/about" className="text-sm hover:text-blue-600">
                        Contact
                    </Link>
                    <Link href="/about" className="text-sm hover:text-blue-600">
                        Help
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
