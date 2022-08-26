import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1 style="display:flex;justify-content: center;align-items: center; height: 100vh; "
    >
    Welcome to Notes Api Server
    </h1>
  `);
});

// connect mongo db
const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function connect() {
  (await client.connect())
    ? console.log("connected to database")
    : console.log("not connected");

  // collections
  const noteCollections = client.db("notes").collection("note");
  const userCollections = client.db("notes").collection("user");

  //   get api
  app.get("/api/notes", async (req: Request, res: Response) => {
    const notes = await noteCollections.find({}).toArray();
    res.json(notes);
  });

  //   get api by id
  app.get("/api/notes/:id", async (req: Request, res: Response) => {
    const note = await noteCollections.findOne({
      _id: ObjectId(req.params.id),
    });
    res.json(note);
  });
  //   post api
  app.post("/api/notes", async (req: Request, res: Response) => {
    const note = await noteCollections.insertOne(req.body);
    res.json(note);
  });
  // patch api
  app.patch("/api/notes/:id", async (req: Request, res: Response) => {
    const note = await noteCollections.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(note);
  });

  // delete api
  app.delete("/api/notes/:id", async (req: Request, res: Response) => {
    const note = await noteCollections.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.json(note);
  });
}

connect().catch(console.dir);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
