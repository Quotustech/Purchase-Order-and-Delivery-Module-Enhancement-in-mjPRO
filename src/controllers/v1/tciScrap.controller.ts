import { Request, Response } from "express";
import { CatchAsyncError } from "../../utils/catchAsyncError";
import puppeteer from "puppeteer";


interface mappedValues {
  [key: string]: string;
}
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

    const response = await page.evaluate(() => {
      const headerRows = ['Booking Station', 'Delivery Station', 'Booking Date', 'Packets', 'Weight', 'Expected Delivery Date'];
      const secondRow = document.querySelector('tbody tr:nth-child(3)');
      const mappedValues: mappedValues = {};


      headerRows.forEach((header, index) => {


        // const value = secondRow?.querySelector(`td:nth-child(${index + 1})`)?.innerText.trim();

        const cell = secondRow?.querySelector(`td:nth-child(${index + 1})`);
        const value = cell instanceof HTMLElement ? cell.innerText.trim() : '';


        mappedValues[header] = value;
      });


      return mappedValues;
    });

    const data = {
      "status": "success",
      "message": "Information received succesfully.",
      "data": {
        "accepted": {
          "content": [
            {
              ...response,
              "trackNo": `${id}`,
              "localLogisticsInfo": {
                "courierCode": "TciExpress",
                "courierNameCN": "TciExpress",
                "courierNameEN": "TciExpress",
                "courierHomePage": "https://www.tciexpress.in/",
                "courierTrackingLink": url
              }
            }
          ],
        },
      },
      "msg": "Success",
    }



    await browser.close();
    res.send({ data });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("No data found");
  }
});











