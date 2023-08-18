const db = require("../db/database");

//collection name
const usersLogCollection = "UsersLog";

class _user {
    getAllDataUser = async () => {
        const getData = await db.collection(usersLogCollection).get();

        const usersLogData = [];

        getData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            usersLogData.push({ id: id, gameData: data });
        });

        if (usersLogData.length === 0) {
            return {
                status: false,
                message: "Masih belum ada yang main game",
            };
        }

        return {
            status: true,
            code: 200,
            data: usersLogData,
        };
    };

    updateDataUser = () => {};

    deleteDataUser = () => {};
}

module.exports = new _user();
