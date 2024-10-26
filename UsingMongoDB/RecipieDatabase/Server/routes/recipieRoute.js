import express from "express";
import {
  deleteRecipie,
  editRecipies,
  getAllRecipie,
  insertRecipie,
} from "../controllers/recipieController.js";

const router = express.Router();

router.get("/allrecipie", getAllRecipie);

router.post("/insertRecipie", insertRecipie);

router.delete("/deleteRecipie/:id", deleteRecipie);

router.patch("/editRecipie/:id",editRecipies)

export default router;
