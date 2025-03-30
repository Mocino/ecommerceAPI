import routerx from 'express-promise-router';
import usercontroller from '../controllers/UserController'
import auth from '../middlewares/auth'

const router = routerx();

router.post("/register", usercontroller.register)
router.put("/update", usercontroller.update)
router.get("/list", auth.verifyAdmin, usercontroller.list)
router.post("/login", usercontroller.login)
router.delete("/delete", usercontroller.remove)

export default router;