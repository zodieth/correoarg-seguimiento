import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { executablePath } from "puppeteer";

//

export default function handler(req, res) {
  puppeteer.use(stealthPlugin);

  const url = "https://www.correoargentino.com.ar/formularios/e-commerce";

  const main = async () => {
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

    // Busca el elemento con la clase específica
    const checkbox = await page.$(".g-recaptcha");

    // Haz clic en el elemento si se encuentra
    if (checkbox) {
      await checkbox.click();
    } else {
      console.log("No se encontró el elemento");
    }
    await page.waitForTimeout(1000);
    await page.click("#btsubmit");
  };

  main();

  return res.status(200).json("aaa");
}
