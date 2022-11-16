import { Router } from "express";
import { info } from "../utils/info.js";
import compression from "compression";
import logger from "../utils/loggers.js";
import generateRandomProduct from "../class/fakerContainer.js";
import randomNumbers from "../utils/randomApi.js";
const listProducts = generateRandomProduct(5);

export const routerInfo = Router();

/*============================[Rutas Info]============================*/
routerInfo

  .get("/productos-test", (req, res) => {
    logger.info(`Se registra petición GET /productos-test`);
    res.render("faker", { listProducts });
  })

  .get("/info", (req, res) => {
    logger.info(`Se registra petición GET /info`);
    res.json({ info: info() });
  })

  .get("/infoBloq", compression(), (req, res) => {
    console.log("infoBloq");
    logger.info(`Se registra petición GET /infoBloq`);
    res.json({ info: info() });
  })

  .get("/infoCompression", compression(), (req, res) => {
    logger.info(`Se registra petición GET /infoCompression`);
    res.json({ info: info() });
  })

  .get("/datos", (req, res) => {
    logger.info(
      `This process is pid at: ${process.pid} -> FyH: ${Date.now()} `
    );
    res.send(`This process is pid at: ${process.pid} -> FyH: ${Date.now()} `);
  })

  .get("/random", (req, res) => {
    let cant = req.query.cant || 100000;
    let numero = randomNumbers(cant);
    logger.info(`Generando ${cant} numeros aleatorios`);
    res.json({ random: numero });
  });

export default routerInfo;
