import express, { Request, Response } from 'express';
import { router } from './routes';

const server = express();

server.use(express.json());
server.use(router)

server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'Hello World' });
});


server.listen(5000, () => {
  console.log('App runing on port 5000!');
})