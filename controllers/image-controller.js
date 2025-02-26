const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers");

const uploadImageController = async (req, res) => {
  try {
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
    res.status(201).json({
      success: true,
      message: "image uploaded successfully",
      Image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong with your image upload",
    });
  }
};

module.exports = { uploadImageController };
