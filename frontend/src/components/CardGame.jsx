import React from "react";
import { coverGame } from "../assets";
import Button from "./Button";
import { Link } from "react-router-dom";

const CardGame = (props) => {
    return (
        <div className="border-[3px] border-black rounded-[20px] w-[350px] h-[600px] p-5 relative">
            <div className="flex justify-center">
                <img
                    src={`http://localhost:5000/assets/${props.value.gambar}`}
                    alt=""
                    className="w-[200px] h-[200px]"
                />
            </div>
            <h1 className="text-3xl font-bold my-5">{props.value.name}</h1>
            <p className="text-[15px]">{props.value.description}</p>
            <div className="flex absolute bottom-4 right-4">
                <Link to={`/edit/${props.id}`}>
                    <Button
                        message={"Edit"}
                        className={
                            "border-black border-[3px] rounded-[20px]  text-center px-8 py-2  text-dark-purple mr-3 font-semibold lg: text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                        }
                    />
                </Link>
                <Link to={`/detail/${props.value.name}`}>
                    <Button
                        message={"Detail"}
                        className={
                            "border-black border-[3px] rounded-[20px]  text-center px-8 py-2 bg-dark-purple text-white font-semibold lg: text-[15px] hover:bg-[#dd6f00] cursor-pointer"
                        }
                    />
                </Link>
            </div>
        </div>
    );
};

export default CardGame;
