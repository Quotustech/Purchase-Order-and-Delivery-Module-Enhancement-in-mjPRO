import { Request, Response } from "express";
import { CatchAsyncError } from "../../utils/catchAsyncError";
import puppeteer from "puppeteer";


export const tciscrap = CatchAsyncError(async (req: Request, res: Response) => {
  try {
    const id = (req as any).id;
    console.log("printing the id")
    console.log(id)

    if (!id) {
      return res.status(400).send('Please provide an ID to scrape');
    }

    const url = 'https://www.tciexpress.in/trackingdocket.aspx?trackshipment=' + `${id}` + "&dwb=dwb";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
      const headerRows = ['Booking Station', 'Delivery Station', 'Booking Date', 'Packets', 'Weight', 'Expected Delivery Date'];
      const secondRow = document.querySelector('tbody tr:nth-child(3)');
      const mappedValues = {};

      // Iterate through the header rows
      headerRows.forEach((header, index) => {
        // Get the text content of the corresponding <td> element in the second row
        //@ts-ignore
        const value = secondRow.querySelector(`td:nth-child(${index + 1})`).innerText.trim();
       
        //@ts-ignore
        mappedValues[header] = value;
      });

      
      return mappedValues;
    });

    console.log("printing the data");
    console.log(data);

    await browser.close();
    res.send({ data });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("No data found");
  }
});

