function NewsLatter() {
    return (
        <div className="lg:py-20 py-5 px-5 border-t border-gray-200 flex flex-col items-center lg:gap-10 gap-5 justify-center">
            <p className="lg:text-3xl text-xl text-center">Join our newsletter and get $20 discount for your first order</p>
            <div className="md:flex justify-center items-center text-center gap-2">
                <input type="text" placeholder="Enter your email" className="w-[300px] my-2 max-w-full outline-none p-3 border border-black " />
                <button className="bg-black text-white p-3 hover-effect uppercase">Subscribe</button>
            </div>
        </div>
    );
}

export default NewsLatter;
