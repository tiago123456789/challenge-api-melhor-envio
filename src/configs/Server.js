import express from "express";
import "./LoadEnvironmentVariable";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Swagger";
import routesApp from "../routes";

const app = express();

// Enable middleware parse data to json.
app.use(express.json());

/**
 * @description Setting route with documentation swagger.
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routesApp(app);

export default app;