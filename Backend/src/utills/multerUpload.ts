import multer from "multer";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "upload/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); 
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, });

export default upload;

// 🟢 Upload to Cloudinary & Delete Local File
export const uploadImageToCloudinary = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: "user_profiles" },
      (error, result) => {
        if (error) return reject(error);

        // ✅ Delete file after successful upload
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });

        resolve(result);
      }
    );
  });
};
