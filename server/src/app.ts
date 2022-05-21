import express, { Application } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { envConfig } from "./config/config";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import morgan from "morgan";

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

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// gzip compression
app.use(compression());

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};
// enable cors
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use("/api", routes);

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("Welcome to Minh's server");
// });
