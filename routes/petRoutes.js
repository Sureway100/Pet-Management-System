const express = require("express");
const parserx = require("../middleware/upload_middleware");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  createPet,
  getPets,
  getAllPets,
  deletePet,
  //   searchPets,
} = require("../controllers/petController");

// const parser = require("../config/cloudinary");

const router = express.Router();

router.get("/", getPets);
router.get("/images", authenticate, getAllPets);
// router.post("/", authenticate, parser.array("images", 3), createPet);
router.post("/", authenticate, parserx.single("images"), createPet);
router.delete("/:id", authenticate, authorize, deletePet);
// router.get("/search", authenticate, searchPets);

module.exports = router;
