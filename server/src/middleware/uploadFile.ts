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
  console.log("req.files", req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return next();
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  await Promise.all(
    Object.keys(files).map(async (it) => {
      const image = files[`${it}`][0];
      const fileName = Date.now() + "." + image.originalname.split(".").pop();
      await handleUploadToFirebase(fileName, image, next);
    })
  );
};

const handleUploadToFirebase = async (
  fileName: string,
  image: Express.Multer.File,
  next: NextFunction
) => {
  const fileCreate = bucket.file(fileName);
  if (fileCreate) {
    const stream = fileCreate.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });
    stream.on("error", (e) => {
      console.error(e);
    });
    stream.on("finish", async () => {
      console.log("fileName", fileName);
      image.path = `https://storage.googleapis.com/${BUCKET_URL}/${fileName}`;
      await fileCreate.makePublic();
      next();
    });
    stream.end(image.buffer);
  } else next();
};

export const uploadImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "slideImages0", maxCount: 1 },
  { name: "slideImages1", maxCount: 1 },
  { name: "slideImages2", maxCount: 1 },
  { name: "slideImages3", maxCount: 1 },
]);
