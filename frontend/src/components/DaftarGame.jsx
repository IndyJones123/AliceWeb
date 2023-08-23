import React, { useState, useEffect } from "react";
import CardGame from "./CardGame";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getGame } from "../services/game.service";

const DaftarGame = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>,
    };

    const [game, setGame] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const gameData = await getGame();

                setGame(gameData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        console.log(game);
        fetchData();
    }, []);

    return (
        <div className="">
            <div className="flex gap-5 mt-2 h-screen justify-center w-[1200px]">
                <div className="flex flex-col p-10 w-[1200px]">
                    <Slider {...settings}>
                        {game.map((game) => (
                            <div className="" key={game.id}>
                                <CardGame value={game.gameData} id={game.id} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default DaftarGame;
