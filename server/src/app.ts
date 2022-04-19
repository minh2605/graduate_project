import express, { Application } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { envConfig } from "./config/config";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import routes from "./routes";

let server;
const app: Application = express();

mongoose
  .connect(envConfig.mongoose.url, envConfig.mongoose.options as ConnectOptions)
  .then(() => {
    console.log(`Connected to DB URL ${envConfig.mongoose.url}`);
    server = app.listen(envConfig.port, () => {
      console.log(`Listening to port ${envConfig.port}`);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/", routes);

// gzip compression
app.use(compression());

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
// app.options("*", cors());

// app.use("/", routes);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("Welcome to Minh's server");
// });
