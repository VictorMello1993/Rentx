import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use('/api', swagger.serve, swagger.setup(swaggerFile));

app.listen(3333, () => console.log('Server is running!'));
