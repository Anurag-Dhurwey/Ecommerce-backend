"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
mongoose_1.default.set("strictQuery", false);
var dbConnect = function () {
    var db = process.env.MONGODB_URI;
    if (!db) {
        throw new Error("data base not found");
    }
    try {
        mongoose_1.default.connect(db);
        console.log("Database Connected Successfully");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = dbConnect;
