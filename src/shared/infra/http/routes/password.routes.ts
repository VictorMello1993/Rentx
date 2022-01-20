import { ForgotPasswordMailController } from '@modules/accounts/useCases/forgotPasswordMail/ForgotPasswordMailController';
import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { Router } from 'express';

const passwordRoutes = Router();

const forgotPasswordMailController = new ForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', forgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
