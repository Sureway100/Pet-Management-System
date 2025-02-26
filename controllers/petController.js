const Pet = require("../models/Pet");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
// const { uploadImageController } = require("../controller/image-controller");
// const User = require("../models/User");

exports.createPet = async (req, res) => {
  try {
    //###

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "file is required, please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store the image url and public id along with the uploaded userId in database
    // const newlyUploadedImage = new Image({
    //   url,
    //   publicId,
    //   uploadedBy: "67a3445d14eb2b8b5ab43779",
    // });
    // await newlyUploadedImage.save();
    if (!url && !publicId) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong with your image upload, try again",
      });
    }

    //###

    req.body.url = url;
    req.body.publicId = publicId;
    req.body.createdBy = req.user.userId;
    const newPetFormData = req.body;
    const newlyCreatedPet = await Pet.create(newPetFormData);
    if (newlyCreatedPet) {
      res.status(201).json({
        success: true,
        message: "Pet added successfully",
        data: newlyCreatedPet,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong, try creating again",
    });
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find().limit(2);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });

    // Check if the user is an admin or the creator of the pet
    if (
      req.user.role !== "admin" &&
      pet.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // Use deleteOne() to remove the pet
    await Pet.deleteOne({ _id: req.params.id });

    res.json({ msg: "Pet removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// exports.searchPets = async (req, res) => {
//   const { query } = req.query;
//   try {
//     const pets = await Pet.find({
//       $or: [
//         { nickname: { $regex: query, $options: "i" } },
//         { color: { $regex: query, $options: "i" } },
//         { breed: { $regex: query, $options: "i" } },
//       ],
//     });
//     res.json(pets);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
