import routerx from 'express-promise-router';
import usercontroller from '../controllers/UserController'

const router = routerx();

router.post("/register", usercontroller.register)
router.post("/update", usercontroller.update)

export default router;