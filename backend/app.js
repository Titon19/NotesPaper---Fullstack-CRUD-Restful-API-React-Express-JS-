require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const noteRotues = require("./routes/noteRoutes.js");
const categoryRotues = require("./routes/categoryRoutes.js");
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRotues);
app.use("/api/categories", categoryRotues);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
