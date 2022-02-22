import app from "./app";
import http from "http";
import type { HttpError } from "http-errors";
import { GameInstance__factory, Auditor__factory } from "@gamble/blockchain";
import config from "@gamble/config";
import { Wallet, providers, BigNumber, BigNumberish } from "ethers";
import { config as dotnevConfig } from "dotenv";
import fetch from "isomorphic-unfetch";
import { isNetwork, Network, NetworkAddress } from "./utils";

dotnevConfig();

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

let nonce = 0;

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: HttpError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr!.port;

  if (!isNetwork(process.env.AVALANCHE_NETWORK)) {
    throw new Error("Invalid network");
  }

  if (process.env.PRIVATE_KEY === undefined) {
    throw new Error("Private key not set");
  }

  const network: Network = process.env.AVALANCHE_NETWORK;

  const gameInstanceAddress = config[network].contracts.TestGame.address;
  const auditorAddress = config[network].contracts.Auditor.address;

  const auditor = Auditor__factory.connect(
    auditorAddress,
    new Wallet(
      process.env.PRIVATE_KEY,
      providers.getDefaultProvider(NetworkAddress[network])
    )
  );

  const gameInstance = new GameInstance__factory().attach(gameInstanceAddress);

  // nonce, value, id;
  auditor.on("RNGRequested", async (id, requester) => {
    const res = await fetch(
      "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=hex16&size=1"
    );
    const data = await res.json();
    const rand = data.data[0];
    auditor.fullfillRNG(
      BigNumber.from(nonce),
      BigNumber.from(parseInt(rand, 16)),
      id,
      { gasLimit: 200000 }
    );
    nonce++;
  });

  console.log("Server listening on " + bind + " 🚀");
}
