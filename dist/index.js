import express from "express";
import router from "./routes/task.routes.js";
const app = express();
const port = 5000;
app.use(express.json());
app.use(router);
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map