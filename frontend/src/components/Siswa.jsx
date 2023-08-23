import React, { useState, useEffect } from "react";

import { getAllUsers, deleteUser } from "../services/user.service";
import Button from "./Button";

import { Link } from "react-router-dom";

const Siswa = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getAllUsers();

                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchData();
    }, []);

    const destroy = async (id) => {
        try {
            await deleteUser(id);
            window.location.reload();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    console.log(users);
    return (
        <div>
            <div className="">
                {users.map((user) => (
                    <div key={user.id}>
                        {user.gameData.Username}
                        {user.gameData.Quest1}
                        {user.gameData.Quest2}
                        {user.gameData.Quest3}
                        {user.gameData.Quest4}
                        {user.gameData.Quest5}

                        <div className="flex">
                            <Link to={`/editsiswa/${user.id}`}>
                                <Button
                                    message={"Edit"}
                                    className={
                                        "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-red-500 text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                    }
                                />
                            </Link>
                            <div
                                className=""
                                onClick={() => deleteUser(user.id)}
                            >
                                <Button
                                    message={"Delete"}
                                    className={
                                        "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-red-500 text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Siswa;
