import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { bucket, BUCKET_URL } from "../firebaseAdmin";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, callback: any) => {
  const extArray = ["jpeg", "jpg", "png", "gif"];
  const ext = file.mimetype.slice(6);
  const flag = extArray.find((e) => e === ext);

  if (!flag) {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: fileFilter,
});

export const uploadImageToFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next();
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (files.image) {
    const image = files.image[0];
    const fileName = Date.now() + "." + image.originalname.split(".").pop();
    handleUploadToFirebase(fileName, image, next);
  }
  if (files.slideImages && files.slideImages.length > 0) {
    files.slideImages.forEach((image) => {
      const fileName = Date.now() + "." + image.originalname.split(".").pop();
      handleUploadToFirebase(fileName, image, next);
    });
  }
};

const handleUploadToFirebase = (
  fileName: string,
  image: Express.Multer.File,
  next: NextFunction
) => {
  const fileCreate = bucket.file(fileName);
  const stream = fileCreate.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });
  stream.on("error", (e) => {
    console.error(e);
  });
  stream.on("finish", async () => {
    await fileCreate.makePublic();
    image.path = `https://storage.googleapis.com/${BUCKET_URL}/${fileName}`;
    next();
  });
  stream.end(image.buffer);
};

export const uploadImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "slideImages", maxCount: 4 },
]);
