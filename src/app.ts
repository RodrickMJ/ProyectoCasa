import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectToDatabase from "./Database/database";
import userRouter from "./Users/infrastructure/UserRouter";
import gateRouter from "./Porton/infraestructure/gateRoutes"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const APP_PORT = process.env.SERVER_PORT || 3000;

app.use('/users', userRouter);
app.use("/gate", gateRouter );

app.listen(APP_PORT, () => {
    console.clear();
    console.log(`Server running at http://localhost:${APP_PORT}`);
    connectToDatabase();  
});