import express from "express";
import authMiddleware from "../utils/authMiddleware.js";
// import someProtectedController from "./controllers/someProtectedController.js";

const router = express.Router();

// router.get("/protected-route", authMiddleware, someProtectedController);

export default router;