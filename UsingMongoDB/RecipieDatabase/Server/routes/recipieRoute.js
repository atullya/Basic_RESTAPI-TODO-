import express from "express";
import {
  deleteRecipie,
  getAllRecipie,
  insertRecipie,
} from "../controllers/recipieController.js";

const router = express.Router();

router.get("/allrecipie", getAllRecipie);

router.post("/insertRecipie", insertRecipie);

router.delete("/deleteRecipie/:id", deleteRecipie);

export default router;
