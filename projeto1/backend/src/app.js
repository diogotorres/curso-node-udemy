import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

class App {

  constructor() {
    this.server = express();
    mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse-vmmfc.mongodb.net/devhouse?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors()); //libera o cors para qualquer dominio
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

}

export default new App().server;