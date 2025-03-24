export default function HomeNewsletter() {
    return (
        <div className="bg-[#faeddc] py-10 border-t border-black/10">
            <div className="container px-12 ">

           
            <div className=" flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h4 className="text-2xl font-bold">Our Newsletter</h4>
                    <p className="text-gray-700">Never miss an update again!</p>
                </div>
                <div className="flex items-center bg-white border border-egreen-800 rounded-full overflow-hidden w-full max-w-md">
                    <input
                        type="email"
                        placeholder="Enter email..."
                        className="flex-1 px-4 py-2 text-gray-700 outline-none"
                    />
                    <button className="bg-egreen-800 text-white px-6 py-2 font-semibold hover:bg-egreen-900 transition-colors">
                        SUBSCRIBE NOW
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}
