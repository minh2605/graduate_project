import productRoute from "./product.route";
import categoryRoute from "./category.route";
import productTypeRoute from "./productType.route";
import authRoute from "./auth.route";
import express from "express";
import orderRoute from "./order.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/product/",
    route: productRoute,
  },
  {
    path: "/category/",
    route: categoryRoute,
  },
  {
    path: "/product_type/",
    route: productTypeRoute,
  },
  {
    path: "/order/",
    route: orderRoute,
  },
  {
    path: "/auth/",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
