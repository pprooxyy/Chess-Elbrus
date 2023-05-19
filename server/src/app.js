require("dotenv").config();
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");

const dbCheck = require("./middlewares/dbCheck");
const authRouter = require("./routes/auth.router");
const gameRouter = require("./routes/game.router");
const profileRouter = require("./routes/profile.router");
const socketModule = require("./sockets/socket");

const app = express();
const PORT = process.env.PORT || 3001;

const sessionConfig = {
  name: "Cookie-Chess",
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "секретное слово",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3005",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    credentials: true,
  })
);

app.use(session(sessionConfig));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);

const rooms = new Map();

const io = require("socket.io")(3002, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
    ],
  },
});
socketModule(io, rooms);

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/", gameRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
