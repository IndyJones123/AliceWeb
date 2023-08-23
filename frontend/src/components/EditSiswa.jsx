import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getDetail, updateUser } from "../services/user.service";

const EditSiswa = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        Username: "",
        Quest1: "",
        Quest2: "",
        Quest3: "",
        Quest4: "",
        Quest5: "",
    });
    const id = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getDetail(id.id);
                const userData = usersData[0].dataUser;

                setFormData({
                    Username: userData.Username,
                    Quest1: userData.Quest1,
                    Quest2: userData.Quest2,
                    Quest3: userData.Quest3,
                    Quest4: userData.Quest4,
                    Quest5: userData.Quest5,
                });
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateData = async (data, id) => {
        try {
            await updateUser(data, id);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    console.log(formData);

    return (
        <div>
            <div className="">
                {users.map((user) => (
                    <div key={user.id}>
                        <div className="">
                            <label>Edit Username: </label>
                            <textarea
                                name={`Username`}
                                className="border border-black"
                                value={formData.Username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <label>Edit Quest1: </label>
                            <textarea
                                name={`Quest1`}
                                className="border border-black"
                                value={formData.Quest1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <label>Edit Quest2: </label>
                            <textarea
                                name={`Quest2`}
                                className="border border-black"
                                value={formData.Quest2}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <label>Edit Quest3: </label>
                            <textarea
                                name={`Quest3`}
                                className="border border-black"
                                value={formData.Quest3}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <label>Edit Quest4: </label>
                            <textarea
                                name={`Quest4`}
                                className="border border-black"
                                value={formData.Quest4}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="">
                            <label>Edit Quest5: </label>
                            <textarea
                                name={`Quest5`}
                                className="border border-black"
                                value={formData.Quest5}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Link
                            to={`/siswa`}
                            onClick={updateData(formData, user.id)}
                        >
                            Update
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditSiswa;
