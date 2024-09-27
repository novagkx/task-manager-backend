import express from "express";
import router from "./routes/task.routes.js";
const app = express();
const port: number = 5000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`));
