import express from 'express'
import itemController from '../controllers/itemController.js';

var router = express.Router();

/* GET home page. */
router.get('/', itemController.index);

router.get("/:category", itemController.item_list)

router.get("/:category/create", itemController.item_create_get)
router.post("/:category/create", itemController.item_create_post)

router.get("/:category/:id", itemController.item_detail)

router.get("/:category/:id/update", itemController.item_update_get)
router.post("/:category/:id/update", itemController.item_update_post)


router.get("/:category/:id/delete", itemController.item_delete_get)
router.post("/:category/:id/delete", itemController.item_delete_post)


export default router;
