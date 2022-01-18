import { ForgotPasswordMailController } from '@modules/accounts/useCases/forgotPasswordMail/ForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const forgotPasswordMailController = new ForgotPasswordMailController();

passwordRoutes.post('/forgot', forgotPasswordMailController.handle);

export { passwordRoutes };
