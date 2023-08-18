const db = require("../db/database");

//collection name
const usersLogCollection = "UsersLog";

class _user {
    getAllDataUser = async () => {
        try {
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
        } catch (error) {
            console.error("request getAllData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    updateDataUser = async (body, id) => {
        try {
            const updateData = await db
                .collection(usersLogCollection)
                .doc(id)
                .get();

            const usersLog = updateData.data();

            if (usersLog.hasOwnProperty(body.quest)) {
                usersLog[body.quest] = body.value;
            }

            await db.collection(usersLogCollection).doc(id).update(usersLog);

            return {
                status: true,
                code: 200,
                message: "data updated successfully",
            };
        } catch (error) {
            console.error("request updateData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    deleteDataUser = async (id) => {
        try {
            const deleteData = await db.collection(usersLogCollection).doc(id);

            await deleteData.delete();

            return {
                status: true,
                code: 200,
                data: "data deleted successfully",
            };
        } catch (error) {
            console.error("request deleteData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    getSpesificDataUser = async (id) => {
        try {
            const getData = await db
                .collection(usersLogCollection)
                .where("Username", "==", id)
                .get();

            const data = [];

            getData.forEach((doc) => {
                const dataUser = doc.data();
                data.push({ id, dataUser });
            });

            return {
                status: true,
                code: 200,
                data,
            };
        } catch (error) {
            console.error("request deleteData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };
}

module.exports = new _user();
