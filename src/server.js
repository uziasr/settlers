const { Server } = require('boardgame.io/server');
import { Catan } from "./Game"

const server = Server({games: [Catan]})

server.run(8000)