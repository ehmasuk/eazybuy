import Link from "next/link";
import { FiTwitter } from "react-icons/fi";
import { LuInstagram } from "react-icons/lu";
import { SlSocialFacebook, SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";

import Logo from "./Logo";

function Footer() {
    return (
        <div className="py-10 border-t border-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2"> 
                    <div className="flex flex-col gap-4 p-4 text-sm">
                        <Logo />
                        <p className="max-w-24 leading-relaxed">29 SE 2nd Ave, Miami, Florida 33131, United States</p>

                        <div>
                            <p className="font-bold text-xl">(786) 425-1900</p>
                            <p className="font-bold">contact@example.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 text-sm">
                        <p className="font-semibold mb-1 text-lg">Infomations</p>
                        <Link className="hover:text-blue-600" href="/">
                            Track Order
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Returns
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Shipping Info
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Help
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 p-4 text-sm">
                        <p className="font-semibold mb-1 text-lg">Follow us</p>
                        <Link className="hover:text-blue-600 flex items-center gap-3" href="/">
                            <SlSocialFacebook fontSize={20} />
                            Facebook
                        </Link>
                        <Link className="hover:text-blue-600 flex items-center gap-3" href="/">
                            <LuInstagram fontSize={20} />
                            Instagram
                        </Link>
                        <Link className="hover:text-blue-600 flex items-center gap-3" href="/">
                            <FiTwitter fontSize={20} />
                            Twitter
                        </Link>
                        <Link className="hover:text-blue-600 flex items-center gap-3" href="/">
                            <SlSocialLinkedin fontSize={20} />
                            Linkedin
                        </Link>
                        <Link className="hover:text-blue-600 flex items-center gap-3" href="/">
                            <SlSocialYoutube fontSize={20} />
                            Youtube
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 p-4 text-sm">
                        <p className="font-semibold mb-1 text-lg">About us</p>
                        <Link className="hover:text-blue-600" href="/">
                            Track Order
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Returns
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Shipping Info
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Help
                        </Link>
                        <Link className="hover:text-blue-600" href="/">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
