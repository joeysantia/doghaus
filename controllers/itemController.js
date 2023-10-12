import asyncHandler from "express-async-handler";
import initDebug from "debug";
import Item from "../models/item.js";
import itemSanitizers from "./sanitizers/itemSanitizers.js";
import { validationResult } from "express-validator";
import multer from "multer";

const debug = initDebug("item");
const upload = multer({ dest: "./public/images/"})

const index = asyncHandler(async (req, res, next) => {
  const categories = [
    {
      name: "Toys",
      url: "/toy",
    },
    {
      name: "Treats",
      url: "/treat",
    },
    {
      name: "Leashes",
      url: "/leash",
    },
    {
      name: "Clothing",
      url: "/clothing",
    },
  ];

  res.render("index", {
    categories,
  });
});

const item_list = asyncHandler(async (req, res, next) => {
  const items = await Item.find(
    { category: req.params.category },
    "name price category number_in_stock photo"
  ).exec();
  const count = items.length;

  const titleMap = {
    'toy': "All toys",
    'leash': "All leashes",
    'treat': 'All treats',
    'clothing': "All clothes"
  }

  res.render('item_list', {
    title: titleMap[req.params.category],
    items,
    count,
    category: req.params.category
  })
});

const item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec()

  if (!item) {
    const err = new Error("Item id was not found")
    err.status = 404
    debug(`item detail failed for id ${req.params.id}`)
    return next(err)
  }

  res.render("item_detail", {
    item 
  })
});

const item_create_get = (req, res, next) => {
    res.render("item_form", {
        title: "Create Item",
        item: null,
        errors: []
    })
};

const item_create_post = [
  upload.single("photo"),
  [...itemSanitizers],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req) 
    
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        number_in_stock: req.body.number_in_stock,
        category: req.params.category,
        photo: req.file || { path: 'public/images/blank-image.png'},
    })

    if (!errors.isEmpty()) {
        res.render("item_form", {
            title: "Create Item",
            item,
            errors: errors.array()
        })
    } else if (req.body.password !== process.env.ADMIN_PASSWORD) {
        res.render("item_form", {
            title: "Create Item",
            item,
            errors: [...errors.array(), { msg: "Incorrect password" }]
        })
    } else {
        await item.save()
        console.log('item was saved')
        res.redirect(item.url)
    }


  }),
];

const item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec()

    if (!item) {
        const err = new Error("Item id was not found")
        err.status = 404
        debug(`item detail failed for id ${req.params.id}`)
        return next(err)
    }

    console.log(item)

    res.render("item_form", {
        title: "Update item",
        item,
        errors: []
    })
});

const item_update_post = [
  [...itemSanitizers],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        number_in_stock: req.body.number_in_stock,
        category: req.params.category,
        photo: req.file || 'public/images/blank-image.png',
        _id: req.params.id
    })

    if (!errors.isEmpty()) {
        res.render("item_form", {
            title: 'Update item',
            item,
            errors: errors.array()
        })
    } else if (req.body.password !== process.env.ADMIN_PASSWORD) {
        res.render("item_form", {
            title: "Update item",
            item,
            errors: [...errors.array(), { msg: "Incorrect password" }],
        })
    } else {
        const updated_item = await Item.findByIdAndUpdate(req.params.id, item, {})
        res.redirect(updated_item.url)
    }
  }),
];

const item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id, "name").exec()

    if (!item) {
        const err = new Error("Item id was not found")
        err.status = 404
        debug(`item delete failed for id ${req.params.id}`)
        return next(err)
    }

    res.render("item_delete", {
        item,
        error: null
    })
});

const item_delete_post = asyncHandler(async (req, res, next) => {


    if (req.body.password !== process.env.ADMIN_PASSWORD) {
        const item = await Item.findById(req.params.id, "name").exec()

        res.render("item_delete", {
            item,
            error: { msg: "Incorrect admin password" }
        })
    } else {
        await Item.findByIdAndDelete(req.params.id)
        res.redirect(`/${req.params.category}`)
    }
});

export default {
  index,
  item_list,
  item_detail,
  item_create_get,
  item_create_post,
  item_update_get,
  item_update_post,
  item_delete_get,
  item_delete_post,
};
