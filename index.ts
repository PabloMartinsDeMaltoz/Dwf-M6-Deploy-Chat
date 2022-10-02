import * as express from "express";
import { admin } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";
import "dotenv/config";
const app = express();

const port = process.env.PORT || 3000;
const firestore = admin.firestore();
const RtDb = admin.database();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");


//Endpoint para crear un usuario nuevb
app.get("/env", (req, res) => {
  res.json(process.env.NODE_ENV);
});

app.post("/signup", (req, res) => {
  console.log("entre");

  const { email } = req.body;
  const { nombre } = req.body;

  console.log(email);

  userCollection
    .where("email", "==", email)
    .get()
    .then((searchResult) => {
      if (searchResult.empty) {
        userCollection
          .add({
            email,
            nombre,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
            });
          });
      } else {
        res.status(400).json({
          message: "user already exist",
        });
        console.log("no ya existe");
      }
    });
});
//Endpoint para Auht
app.post("/auth", (req, res) => {
  const { email } = req.body;
  userCollection
    .where("email", "==", email)
    .get()
    .then((searchResult) => {
      if (searchResult.empty) {
        res.json({ message: "not found" });
      } else {
        console.log(searchResult.docs);
        res.json({
          userId: searchResult.docs[0].id,
        });
      }
    });
});
//Endpoint para crear un Room nuevo
app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollection
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = RtDb.ref("rooms/" + nanoid()); // si existe ese ID crea la room y le ponemos un id diferente
        roomRef
          .set({
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key; //nos guardamos ese id diferente en una referencia para luego llevarlo al database
            const roomIdShort = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(roomIdShort.toString()) // aca creamos un documento nuevo en la collection rooms , con un Id corto
              .set({
                realTimeDataBaseId: roomLongId, // y en la collection de rooms guardamos el id de la realTimeDataBase
              })
              .then(() => {
                res.json({ roomIdShort: roomIdShort.toString(), roomLongId }); // al usuario le respondemos con el ID CORTO
                console.log(roomIdShort);
              });
          });
      } else {
        res.status(401).json({
          messagge: "no existis",
        });
      }
    });
});

//Endpoint para recuperar una sala ya creada

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query; //query nos da el valor del id del user que nos llega por url queryParams de postMan
  const { roomId } = req.params; //params nos da el valor de la room de ese user que nos llego por url
  console.log(userId, roomId);

  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data(); // con .data extraemos lo que tiene el doc
            console.log("data");
            res.json(data); // le devolvemos al usuario el ID De la room de la RTDB
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});
app.post("/messages", (req, res) => {
  const data = req.body;
  console.log(data);

  const generalRef = RtDb.ref("/rooms/" + data.rtdbRoomId + "/0/messages");
  const newMessageRef = generalRef.push();
  newMessageRef
    .set({
      message: data.message,
      from: data.nombre,
      local: true,
    })
    .then(() => {
      res.json("mensaje creado");
    });
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html"); // Ojo poner al final
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
