import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail, updateQuest, deleteQuest } from "../services/quest.service";

import Button from "./Button";

// ... imports

const EditQuestGoals = () => {
    const { id } = useParams();

    const [quest, setQuest] = useState([]);
    const [formData, setFormData] = useState({
        NamaQuest: "",
        Description: [],
        Goals: [],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const questData = await getDetail(id);
                setQuest(questData);
                setFormData({
                    NamaQuest: questData.NamaQuest,
                    Description: questData.Description,
                    Goals: questData.Goals,
                });
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const newArray = [...prevData[arrayName]];
            newArray[index] = value;
            return {
                ...prevData,
                [arrayName]: newArray,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateQuest(id, formData);
    };

    const destroy = async (id, data) => {
        console.log(id, data);
        try {
            await deleteQuest(id, data);
            window.location.reload();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="">
            {quest ? (
                <div className="">
                    <div className="">
                        <div>
                            <label>Nama Quest:</label>
                            <textarea
                                name="NamaQuest"
                                className="border border-black"
                                value={formData.NamaQuest}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formData.Goals ? (
                            <div className="">
                                {formData.Goals.map((goal, index) => (
                                    <div className="p-5 flex gap-2" key={index}>
                                        <div>
                                            <label>Goal {index + 1}:</label>
                                            <textarea
                                                name={`goals_${index}`}
                                                className="border border-black"
                                                value={goal}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        e,
                                                        index,
                                                        "Goals"
                                                    )
                                                }
                                            />
                                            <div
                                                className=""
                                                onClick={() =>
                                                    destroy(id, {
                                                        field: "Goals",
                                                        index: index,
                                                    })
                                                }
                                            >
                                                <Button
                                                    message={"Hapus"}
                                                    className={
                                                        "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-red-500 text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="">Loading data...</div>
                        )}
                        {formData.Description ? (
                            <div className="">
                                {formData.Description.map((desc, index) => (
                                    <div className="p-5 flex gap-2" key={index}>
                                        <div>
                                            <label>
                                                Description {index + 1}:
                                            </label>
                                            <textarea
                                                name={`desc_${index}`}
                                                className="border border-black"
                                                value={desc}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        e,
                                                        index,
                                                        "Description"
                                                    )
                                                }
                                            />
                                            <div
                                                className=""
                                                onClick={() =>
                                                    destroy(id, {
                                                        field: "Description",
                                                        index: index,
                                                    })
                                                }
                                            >
                                                <Button
                                                    message={"Hapus"}
                                                    className={
                                                        "border-black border-[3px] rounded-[20px] text-center px-8 py-2 bg-red-500 text-white font-semibold lg:text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="">Loading data desc...</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}

            <button type="submit">Upload</button>
        </form>
    );
};

export default EditQuestGoals;
