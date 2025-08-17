import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userroutes from "./src/routes/user.js";
import noteroutes from "./src/routes/notesRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// Routes
app.use("/auth", userroutes);
app.use("/notes", noteroutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
