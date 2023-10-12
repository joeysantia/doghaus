import { body } from "express-validator";

const itemSanitizers = [
  body("name", "Name must not be left blank").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be left blank")
  .trim()  
  .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Number in stock must be greater than zero")
    .isNumeric({ min: 1 })
    .escape(),
  body("number_in_stock", "Number in stock must be a whole number")
    .isInt()
    .escape(),
  body("price", "Price must be greater than zero")
    .isNumeric({ min: 0.01 })
    .escape(),
  body("price", "Price must be in dollars and cents (e.g. 3.99)")
    .custom(value => {
      return Number.isInteger(value * 100)  
    })
];

export default itemSanitizers