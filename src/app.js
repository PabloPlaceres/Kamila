import express from "express";
import  dotenv  from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/router.js"
import fileUpload from "express-fileupload";
import multer from 'multer';


const testRouter = express.Router();

dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

export const upload = multer({ storage: storage });

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use("/api", router);
app.use("/", express.static(path.join(__dirname, "./public")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



const PORT = process.env.PORT || 8080;
app.set("port", PORT);

export default app