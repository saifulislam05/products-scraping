const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const products = [];

const getproducts = async () => {
  try {
    const response = await axios.get(
      "https://saifulislam05.github.io/html-pages-for-scraping/products.html",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    const $ = cheerio.load(response.data);
    $(".card").each((index, elem) => {
      const product = [
        $(elem).find(".name").text(),
        $(elem).find(".price").text(),
        $(elem).find(".availability").text(),
        $(elem).find(".rating").text(),
        
      ];
      products.push(product);
    });

    const headers = [
      "Name",
      "Price",
      "Availability",
      "Rating",
      
    ];
    products.unshift(headers);

    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(products); 

    
    xlsx.utils.book_append_sheet(workbook, sheet, "productsData");
    xlsx.writeFile(workbook, "products.xlsx");
    console.log("XLSX file created successfully!");
  } catch (error) {
    console.log(error);
  }
};

getproducts();
