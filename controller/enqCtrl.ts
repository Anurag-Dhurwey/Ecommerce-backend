// const Enquiry = require("../models/enqModel");
import Enquiry from "../models/enqModel";
// const asyncHandler = require("express-async-handler");
import asyncHandler from "express-async-handler";
// const validateMongoDbId = require("../utils/validateMongodbId");
import { validateMongoDbId } from "../utils/validateMongodbId";
import { Req_with_user } from "../middlewares/authMiddleware";

const createEnquiry = asyncHandler(async (req, res) => {
  let { populate = "" } = req.query;
  if (populate != "user") populate = "";
  try {
    const newEnquiry = await new Enquiry(req.body).save();
    res.json(populate?await newEnquiry.populate(populate as string | string[]):newEnquiry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  let { populate = "" } = req.query;
  if (populate != "user") populate = "";
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const updated = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(populate?await updated?.populate(populate as string | string[]):updated);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const getEnquiryById = asyncHandler(async (req, res) => {
  let { populate = "" } = req.query;
  if (populate != "user") populate = "";
  const { id } = req.params;
  try {
    validateMongoDbId(id);
   if(populate){
    const getaEnquiry = await Enquiry.findById(id).populate(
      populate as string | string[]
    );
    res.json(getaEnquiry);
   }else{
    const getaEnquiry = await Enquiry.findById(id)
    res.json(getaEnquiry);
   }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
const getEnquiryByUser = asyncHandler(async (req: Req_with_user, res) => {
  let { populate = "" } = req.query;
  if (populate != "user") populate = "";
  if (!req.user) throw new Error("user not found");
  let { id } = req.params;
  id = id || req.user._id;
  try {
    validateMongoDbId(id);
   if(populate){
    const getaEnquiry = await Enquiry.find({ user: id }).populate(
      populate as string | string[]
    );
    res.json(getaEnquiry);
   }else{
    const getaEnquiry = await Enquiry.find({ user: id })
    res.json(getaEnquiry);
   }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
const getallEnquiry = asyncHandler(async (req, res) => {
  let { populate = "" } = req.query;
  if (populate != "user") populate = "";
  try {
   if(populate){
    const getallEnquiry = await Enquiry.find().populate(
      populate as string | string[]
    );
    res.json(getallEnquiry);
   }else{
    const getallEnquiry = await Enquiry.find()
    res.json(getallEnquiry);
   }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
export {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
  getEnquiryByUser,
  getallEnquiry,
};
