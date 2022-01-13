import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/usecases/devolutionRental/DevolutionRentalController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);

export { rentalsRoutes };
