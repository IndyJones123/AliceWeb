const db = require("../db/database");

//collection name
const gameCollection = "game";

class _game {
    addGame = async (body, file) => {
        const game = {
            name: body.name,
            description: body.description,
            gambar: file ? file.filename : null,
        };

        const postDoc = db
            .collection(gameCollection)
            .where("name", "==", game.name);
        const docSnapshot = await postDoc.get();

        const dbGame = [];

        docSnapshot.forEach((doc) => {
            const userData = doc.data();
            const userId = doc.id;
            dbGame.push({ id: userId, data: userData });
        });

        if (dbGame > 0) {
            return {
                status: false,
                message: "Game sudah terdaftar",
            };
        }

        const register = await db
            .collection(gameCollection)
            .add(game)
            .then((docRef) => {
                console.log("Document added with ID:", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document:", error);
            });

        return {
            status: true,
            code: 200,
            message: "Add game success",
        };
    };

    getGame = async () => {
        const getData = await db.collection(gameCollection).get();

        const gameData = [];

        getData.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            gameData.push({ id: id, gameData: data });
        });

        if (gameData.length === 0) {
            return {
                status: false,
                message: "Game tidak ada, silakan tambah game dulu",
            };
        }

        return {
            status: true,
            code: 200,
            data: gameData,
        };
    };

    getGameDetail = async (id) => {
        const getData = await db.collection(gameCollection).doc(id).get();

        const gameData = getData.data();

        if (!gameData) {
            return {
                status: false,
                message: "Game tidak ada",
            };
        }

        return {
            status: true,
            code: 200,
            data: gameData,
        };
    };
}

module.exports = new _game();
