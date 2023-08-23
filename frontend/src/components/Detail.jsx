import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuest } from "../services/quest.service";
import Button from "./Button";

import { Link } from "react-router-dom";

const Detail = () => {
    const id = useParams();

    const [quests, setQuests] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const questData = await getQuest(id.id);
                console.log("questData:", questData); // Log the questData
                setQuests(questData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchData();
    }, []);

    const destroy = async (id) => {
        try {
            await deleteQuest(id);
            window.location.reload();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div className="">
            <h1 className="ml-5 text-3xl font-bold">Quest</h1>
            <div className=" h-[300px] my-2 ml-5">
                <table className="border-collapse border w-[900px] border-black table-auto">
                    <thead>
                        <tr>
                            <th className="border border-black">Description</th>
                            <th className="border border-black">Goal</th>
                            <th className="border border-black">Nama Quest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quests.map((quest, index) => (
                            <tr key={index}>
                                <td className="border border-black">
                                    <div className="">
                                        {quest.data &&
                                        quest.data.Description ? (
                                            quest.data.Description.map(
                                                (desc, descIndex) => (
                                                    <div
                                                        className="p-5 flex gap-2"
                                                        key={descIndex}
                                                    >
                                                        {descIndex + 1 + ". "}
                                                        {desc}
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="">
                                                Loading description data...
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="border border-black">
                                    <div className="">
                                        {quest.data && quest.data.Goals ? (
                                            quest.data.Goals.map(
                                                (goal, goalIndex) => (
                                                    <div
                                                        className="p-5 flex gap-2"
                                                        key={goalIndex}
                                                    >
                                                        {goalIndex + 1 + ". "}
                                                        {goal}
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="">
                                                Loading goal data...
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="border border-black p-5">
                                    {quest.data && quest.data.NamaQuest
                                        ? quest.data.NamaQuest
                                        : "Loading Nama Quest..."}
                                </td>
                                <div className="mt-5 p-5 flex flex-col items-center">
                                    <Link
                                        to={`/edit/${quest.id}/${quest.data.game}`}
                                    >
                                        <Button
                                            message={"Edit"}
                                            className={
                                                "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-dark-purple text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                            }
                                        />
                                    </Link>
                                    <Button
                                        message={"Hapus"}
                                        className={
                                            "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-red-500 text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                        }
                                    />
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Detail;
