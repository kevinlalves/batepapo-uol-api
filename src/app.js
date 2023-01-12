import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const dbClient = new MongoClient();

const app = express();
app.disable(x-powered-by);
app.use(cors());
app.use(json())
