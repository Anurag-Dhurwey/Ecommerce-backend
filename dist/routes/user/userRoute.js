"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const userCtrl_1 = require("../../controller/user/userCtrl");
// const passwordRoute = require("./passwordRoute");
const passwordRoute_1 = __importDefault(require("./passwordRoute"));
// const cartRoutes = require("./cartRoutes");
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
// const orderRoutes = require("./orderRoutes");
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
// const addressRoutes = require("./addressRoutes");
const addressRoutes_1 = __importDefault(require("./addressRoutes"));
// const wishlistRoute = require("./wishlistRoute");
const wishlistRoute_1 = __importDefault(require("./wishlistRoute"));
// const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/register", userCtrl_1.createUser);
router.get("/refresh", userCtrl_1.handleRefreshToken);
router.post("/login", userCtrl_1.loginUserCtrl);
router.post("/admin-login", userCtrl_1.loginAdmin);
router.get("/logout", userCtrl_1.logout);
router.use("/password", passwordRoute_1.default);
router.use("/cart", cartRoutes_1.default);
router.use("/order", orderRoutes_1.default);
router.use("/wishlist", wishlistRoute_1.default);
router.use("/address", addressRoutes_1.default);
router.put("/edit", authMiddleware_1.authMiddleware, userCtrl_1.updatedUser);
router.get("/find/:id", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userCtrl_1.getaUser);
router.get("/find-all", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userCtrl_1.getallUser);
router.put("/block/:id", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userCtrl_1.blockUser);
router.put("/unblock/:id", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userCtrl_1.unblockUser);
router.delete("/delete/:id", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userCtrl_1.deleteaUser);
exports.default = router;
