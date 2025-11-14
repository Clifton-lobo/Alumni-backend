const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbgldur3y",
  api_key: "374649195317325",
  api_secret:"s2-iP7VGgjGDCA9U_xAxgeYZ7j8",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Proper helper
async function handleImageUploadUtil(fileBuffer, mimetype) {
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const dataURI = `data:${mimetype};base64,${base64Data}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "events", // optional
    resource_type: "image",
  });

  return result;
}

module.exports = { cloudinary, upload, handleImageUploadUtil };
