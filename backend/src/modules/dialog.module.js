const db = require("../db/database");

//collection name
const dialogCollection = "Dialog";

class _dialog {
    getDialog = async (id) => {
        try {
            const getData = await db
                .collection(dialogCollection)
                .where("Quest", "==", id)
                .get();

            const dialogData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                dialogData.push({ id: id, gameData: data });
            });

            return {
                status: true,
                code: 200,
                dialogData,
            };
        } catch (error) {
            console.error("request getData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    updateDialog = async (id, body) => {
        try {
            const updateData = await db
                .collection(dialogCollection)
                .doc(id)
                .get();

            const dialogData = updateData.data();

            dialogData.Massage[body.index] = body.value;

            await db.collection(dialogCollection).doc(id).update(dialogData);

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

    deleteDialog = async (id, body) => {
        try {
            const deleteData = await db
                .collection(dialogCollection)
                .doc(id)
                .get();

            const dialogData = deleteData.data();
            dialogData.Massage.splice(body.index, 1);

            await db.collection(dialogCollection).doc(id).update(dialogData);

            return {
                status: true,
                code: 200,
                message: "data deleted successfully",
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

module.exports = new _dialog();
