import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { executablePath } from "puppeteer";
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");

export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   res.status(405).send({ message: "Only POST requests allowed" });
  //   return;
  // }

  puppeteer.use(stealthPlugin);

  // puppeteer.use(
  //   RecaptchaPlugin(
  //     {
  //       provider: { id: "2captcha", token: "2cfed42a076aedbef4d4807d89799480" },
  //     },
  //     { visualFeedback: true }
  //   )
  // );

  const url = "https://www.correoargentino.com.ar/formularios/e-commerce";

  // const main = async
  // async () => {
  const { id } = await req.body;

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
  });

  const page = await browser.newPage();

  await page.goto(url);

  await page.type("#numero", id.toString());
  // Espera a que el elemento sea visible y se pueda interactuar
  await page.waitForSelector(".g-recaptcha");

  const checkbox = await page.$(".g-recaptcha");

  if (checkbox) {
    await checkbox.click();
  } else {
    console.log("No se encontró el elemento");
  }

  // const { solved, error } = await page.solveRecaptchas();
  // if (solved) {
  // }

  await page.waitForTimeout(2000);
  await page.click("#btsubmit");
  await page.waitForTimeout(1000);

  await page.waitForSelector("table");

  await page.waitForSelector("table");

  // Obtiene todas las filas de la tabla
  const rows = await page.$$("table tr");

  const data = [];
  for (const row of rows) {
    // Busca todos los elementos <td> dentro de cada fila
    const cells = await row.$$("td");

    if (cells.length === 4) {
      // Verifica que haya 4 columnas en la fila (fecha, planta, historia y otra columna)
      const rowData = {};

      // Extrae el texto de cada elemento <td> y lo asigna al objeto rowData
      const fecha = await page.evaluate(
        (cell) => cell.textContent.trim(),
        cells[0]
      );
      const planta = await page.evaluate(
        (cell) => cell.textContent.trim(),
        cells[1]
      );
      const historia = await page.evaluate(
        (cell) => cell.textContent.trim(),
        cells[2]
      );

      const estado = await page.evaluate(
        (cell) => cell.textContent.trim(),
        cells[3]
      );

      rowData.Fecha = fecha;
      rowData.Planta = planta;
      rowData.Historia = historia;
      rowData.Estado = estado;

      // Agrega el objeto rowData al array data
      data.push(rowData);
    }
  }
  await browser.close();
  // };

  return res.status(200).json(data);
}
