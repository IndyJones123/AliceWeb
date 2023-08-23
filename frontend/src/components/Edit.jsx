import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getGameDetail } from "../services/game.service";

const Edit = () => {
    const id = useParams();
    const [game, setGame] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const gameData = await getGameDetail(id.id);

                setGame(gameData);
            } catch (error) {
                console.error("Error fetching getGameDetail:", error);
            }
        }
        fetchData();
    }, []);
    console.log(game);

    return <div className=""></div>;
};

export default Edit;
