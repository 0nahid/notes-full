import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
dotenv.config();
// middleware
const app: Express = express();
app.use(cors()); /* NEW */
app.use(express.json());

const port = process.env.PORT || 5000;
const jwtToken = process.env.ACCESS_TOKEN_SECRET || "";

// verify jwt token
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers?.authorization;
  // console.log(`authorization`, authorization);
  if (!authorization) {
    return res
      .status(403)
      .send({ success: false, message: "Forbidden Access" });
  }
  const token = authorization.split(" ")[1];
  // console.log(`token`, token);
  jwt.verify(token, jwtToken, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ success: false, message: "Forbidden Access" });
    }
    //  add the decoded user to the request object
    req.body.user = decoded;    
    next();
  });
}

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1 style="display:flex;justify-content: center;align-items: center; height: 100vh; "
    >
    Welcome to Notes Api Server
    </h1>
  `);
});

// connect mongo db
const url = process.env.MONGO_URL || "";
const client = new MongoClient(url, {
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
  app.get("/api/notes", verifyToken, async (req: Request, res: Response) => {
    const notes = await noteCollections
      .find({})
      .sort({ $natural: -1 })
      .toArray();
    res.json(notes);
    // console.log(req.body.user.email);
    
  });

  // get api by id
  app.get("/api/notes/:id", async (req: Request, res: Response) => {
    const note = await noteCollections.findOne({
      _id: new ObjectId(req.params.id),
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
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(note);
  });

  // delete api
  app.delete("/api/notes/:id", async (req: Request, res: Response) => {
    const note = await noteCollections.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(note);
  });

  // user put api
  app.put("/api/user/:email", async (req, res) => {
    const email = req.params.email;
    // console.log(email);
    const user = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const token = jwt.sign({ email: email }, jwtToken, { expiresIn: "1d" });
    // console.log(token);
    const result = await userCollections.updateOne(filter, updateDoc, options);
    res.send({ result, token });
  });
}

connect().catch(console.dir);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
