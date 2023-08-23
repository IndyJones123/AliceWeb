import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DaftarGame from "./components/DaftarGame";
import Siswa from "./components/Siswa";
import Edit from "./components/Edit";
import Detail from "./components/Detail";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { loginUser } from "./services/auth.service";
import { setCookies } from "./plugins/cookies";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditQuestGoals from "./components/EditQuestGoals";
import EditSiswa from "./components/EditSiswa";

export default function App() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (data) => {
        try {
            const token = await loginUser(data);
            console.log(token);
            setCookies("CERT", token);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>,
    };
    return (
        <Router>
            {1 + 1 == 2 ? (
                <div className=" flex overflow-hidden">
                    <SideBar />
                    <div className="p-7 w-[1000px]">
                        <Routes>
                            <Route path="/" element={<DaftarGame />} />
                            <Route path="/siswa" element={<Siswa />} />
                            <Route
                                path="/edit/:id/:name"
                                element={<EditQuestGoals />}
                            />
                            <Route path="/detail/:id" element={<Detail />} />
                            <Route
                                path="/editsiswa/:id"
                                element={<EditSiswa />}
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="">
                        <label>username: </label>
                        <textarea
                            name={`email`}
                            className="border border-black"
                            onChange={handleInputChange}
                        />
                        <label>password</label>
                        <textarea
                            itemType="password"
                            name={`password`}
                            className="border border-black"
                            onChange={handleInputChange}
                        />

                        <button onClick={() => handleSubmit(login)}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </Router>
    );
}
