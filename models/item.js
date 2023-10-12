import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number_in_stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photo: {
    type: Object,
    required: true
  }
});

ItemSchema.virtual("url").get(function () {
    return `/${this.category}/${this._id}`
});
ItemSchema.virtual("photoSrc").get(function () {
  return this.photo.path.slice(6)
})
const ItemModel = mongoose.model("Item", ItemSchema)

export default ItemModel
