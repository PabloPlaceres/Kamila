import express from "express";
import  dotenv  from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/router.js"

const testRouter = express.Router();

dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/", express.static(path.join(__dirname, "./public")));

app.get("/*", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.set("port", PORT);

export default app