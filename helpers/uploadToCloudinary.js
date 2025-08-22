import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_COUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_COUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_COUDINARY_API_SECRET,
});

const uploadToCloudinary = (base64String) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64String, { resource_type: "auto", folder: "eazybuy" }, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return reject(new Error("Failed to upload image to Cloudinary."));
      }
      resolve(result.secure_url);
    });
  });
};

export default uploadToCloudinary;
