const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");

//collection name
const usersCollection = "Users";

class _auth {
    login = async (body) => {
        try {
            const users = {
                email: body.email,
                password: body.password,
            };

            const postDoc = db
                .collection(usersCollection)
                .where("email", "==", users.email);
            const docSnapshot = await postDoc.get();

            const account = [];

            docSnapshot.forEach((doc) => {
                const userData = doc.data();
                const userId = doc.id;
                account.push({ id: userId, data: userData });
            });

            if (account.length == 0) {
                return {
                    status: false,
                    message: "Akun tidak ditemukan. Daftaro dulu",
                };
            }

            if (!bcrypt.compareSync(body.password, account[0].data.password)) {
                return {
                    status: false,
                    code: 401,
                    error: "Wrong password",
                };
            }

            const payload = {
                id: account[0].id,
                email: account[0].data.email,
                username: account[0].data.username,
            };

            const token = jwt.sign(payload, "jwt-secret-code", {
                expiresIn: "8h",
            });

            return {
                status: true,
                code: 201,
                token: token,
            };
        } catch (error) {
            console.error("register auth module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    register = async (body) => {
        try {
            //cek jumlah karakter password
            if (body.password.length < 5) {
                return {
                    status: false,
                    message: "Password harus melebihi 6 karakter!",
                };
            }

            const password_hash = bcrypt.hashSync(body.password, 10);

            const users = {
                email: body.email,
                password: password_hash,
                username: body.username,
            };

            users.password = password_hash;

            //cek email sudah terdaftar atau belum
            const postDoc = db
                .collection(usersCollection)
                .where("email", "==", users.email);
            const docSnapshot = await postDoc.get();

            const account = [];

            docSnapshot.forEach((doc) => {
                const userData = doc.data();
                account.push(userData);
            });

            if (account.length > 0) {
                return {
                    status: false,
                    message: "Akun sudah ada, daftar dengan email yang berbeda",
                };
            }

            //input data ke db
            const register = await db
                .collection(usersCollection)
                .add(users)
                .then((docRef) => {
                    console.log("Document added with ID:", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document:", error);
                });

            return {
                status: true,
                code: 201,
                message: "Register success",
            };
        } catch (error) {
            console.error("register auth module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };
}

module.exports = new _auth();
