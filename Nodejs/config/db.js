const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("mongoUrl");

const DBconnect = async () => {
    try {
        await mongoose.connect(
            dbUrl,
            { useNewUrlParser: true },
            (err, mongoClient) => {
                if (err) {
                    console.log("Error:", err);
                }
                else {
                    console.log("MongoDB connected! " + mongoClient.name)
                }
            }
        )
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = DBconnect;