import 'dotenv/config';

import cors from 'cors';
import io from 'socket.io';
import http from 'http';

import express from 'express';
import routes from './routes';

import './database';

class App {
	constructor() {
		this.app = express();
		this.server = http.Server(this.app);
		this.socket();

		this.middlewares();
		this.routes();

		this.connectedUsers = {};
	}

	socket() {
		this.io = io(this.server);

		this.io.on('connection', socket => {
			const { user_id } = socket.handshake.query;
			this.connectedUsers[user_id] = socket.id;

			socket.on('disconnect', () => {
				delete this.connectedUsers[user_id];
			});
		});
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());

		this.app.use((req, res, next) => {
			req.io = this.io;
			req.connectedUsers = this.connectedUsers;

			next();
		});
	}

	routes() {
		this.app.use(routes);
	}
}

export default new App().server;
