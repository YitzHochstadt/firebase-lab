import * as functions from "firebase-functions";
import express from "express";
import cors from 'cors';
import { getClient } from "../db";
import ShoutOut from "../model/ShoutOut";
import { ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
      const client = await getClient();
      const results = await client.db().collection<ShoutOut>('shoutOuts').find().toArray();
      res.json(results); // send JSON results
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

app.post("/", async (req, res) => {
    const shoutOut = req.body as ShoutOut;
    try {
      const client = await getClient();
      const result = await client.db().collection<ShoutOut>('shoutOuts').insertOne(shoutOut);
      shoutOut._id = result.insertedId;
      res.status(201).json(shoutOut);
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<ShoutOut>('shoutOuts').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({message: "Not Found"});
      } else {
        res.status(204).end();
      }
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

export default functions.https.onRequest(app);