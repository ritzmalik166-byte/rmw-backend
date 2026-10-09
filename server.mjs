import express from "express"
import path from "path";
const app = express();
import cors from "cors";
app.use(cors());

const PORT = 5000;

app.use("/images", express.static(path.join("D:/ritz-blogs/images")));

app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}`);
});