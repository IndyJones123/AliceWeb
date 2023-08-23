import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import { MdOutlineGames } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";

const SideBar = () => {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={`relative bg-dark-purple h-screen p-5 pt-8 ${
                open ? "w-72" : "w-20 mr-32"
            } duration-300`}
        >
            <BsArrowLeftShort
                className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
                    open ? "hidden" : "block"
                }} ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />

            <div className="inline-flex items-center gap-2">
                <FaGamepad className="bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 p-1" />
                <h1
                    className={`text-white origin-left font-medium text-lg ${
                        !open && "scale-0"
                    }`}
                >
                    AliceAdmin
                </h1>
            </div>

            <Link to="/">
                <div className="pt-2 mt-3">
                    <div className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
                        <span className="text-2xl block float-left">
                            <MdOutlineGames />
                        </span>
                        <h1 className={`${!open && "hidden"}`}>Daftar Game</h1>
                    </div>
                </div>
            </Link>

            <Link to="/siswa">
                <div className="pt-2">
                    <div className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
                        <span className="text-2xl block float-left">
                            <IoPersonOutline />
                        </span>
                        <h1 className={`${!open && "hidden"}`}>Daftar Siswa</h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SideBar;
