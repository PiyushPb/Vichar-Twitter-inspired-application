import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dmjgdrcme",
  api_key: "346372257463611",
  api_secret: "IiSW9jLT8SUatIlO3xQ34VRh01Q",
});

export async function uploadToCloudinary(image) {
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
