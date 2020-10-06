import express from "express";
import "express-async-errors";
import routes from "./app/routes";
import AppError from "./app/erros/AppError";
import basicAuth from "./app/middleware/BasicAuth";

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());

    this.server.use(basicAuth);
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(
      async (
        err: Error,
        request: express.Request,
        response: express.Response,
        _: express.NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      }
    );
  }
}

export default new App().server;
