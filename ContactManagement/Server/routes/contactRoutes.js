import express from "express";
import {
  allContact,
  createContact,
  deleteContact,
  editContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Route for both getting all contacts and creating a new contact
router
  .route("/contacts")
  .get(allContact) // GET /contacts to retrieve all contacts
  .post(createContact); // POST /contacts to create a new contact

router.delete("/contacts/:id", deleteContact);
router.patch("/contacts/:id", editContact);

export default router;
