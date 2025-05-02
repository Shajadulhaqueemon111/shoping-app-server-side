import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { productRouter } from "../modules/products/product.route";

const router = Router();

const modulesRouter = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/product",
    route: productRouter,
  },
];
modulesRouter.forEach((route) => router.use(route.path, route.route));

export default router;
