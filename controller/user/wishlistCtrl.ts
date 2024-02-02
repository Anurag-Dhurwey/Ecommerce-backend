// const User = require("../../models/userModel");
import User from "../../models/userModel";
// const asyncHandler = require("express-async-handler");
import asyncHandler from "express-async-handler";
// const validateMongoDbId = require("../../utils/validateMongodbId");
import { validateMongoDbId } from "../../utils/validateMongodbId";
import { Req_with_user } from "../../middlewares/authMiddleware";
import { Response } from "express";
import wishlistModel from "../../models/wishlistModel";

const createOrDeleteItem = asyncHandler(
  async (req: Req_with_user, res: Response) => {
    if (!req.user) throw new Error("user not found");
    const { _id } = req.user;
    let { populate = "" } = req.query;
    if (populate != "product" && populate != "user") populate = "";

    const { id } = req.params;
    try {
      validateMongoDbId(id);
      const alreadyadded = await wishlistModel.findOne({
        user: _id,
        $or: [{ _id: id }, { product: id }],
      });
      if (alreadyadded) {
        let product = await wishlistModel.deleteMany({ product: id });
        res.json({ status: "removed", wish: product });
      } else {
        const added = await new wishlistModel({
          product: id,
          user: _id,
        }).save();
        res.json({
          status: "added",
          wish: populate
            ? await added.populate(populate as string | string[])
            : added,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

const getWishlistByUser = asyncHandler(
  async (req: Req_with_user, res: Response) => {
    if (!req.user) throw new Error("user not found");
    const { _id } = req.user;
    const { id: param_id } = req.params;
    let { populate = "" } = req.query;
    if (populate != "product" && populate != "user") populate = "";

    let id = _id || param_id;
    try {
      validateMongoDbId(id);
      if (populate) {
        const wishlist = await wishlistModel
          .find({ user: id })
          .populate(populate as string | string[]);
        res.json(wishlist);
      } else {
        const wishlist = await wishlistModel.find({ user: id });
        res.json(wishlist);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
const getWishById = asyncHandler(async (req: Req_with_user, res: Response) => {
  if (!req.user) throw new Error("user not found");
  // const { _id } = req.user;
  const { id } = req.params;
  let { populate = "" } = req.query;
  if (populate != "product" && populate != "user") populate = "";
  try {
    validateMongoDbId(id);
    if (populate) {
      const wishlist = await User.find({ _id: id }).populate(
        populate as string | string[]
      );
      res.json(wishlist);
    } else {
      const wishlist = await User.find({ _id: id });
      res.json(wishlist);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export { getWishlistByUser, getWishById, createOrDeleteItem };
