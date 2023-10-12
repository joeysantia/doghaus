import mongoose from "mongoose"
import Item from "./models/item.js"
import dotenv from 'dotenv'

mongoose.set("strictQuery", false)
dotenv.config()
main().catch(err => console.log(err))

async function main() {
    console.log('connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_KEY)
    console.log('connection successful')
    console.log('fetching items')
    const items = await Item.find({}).exec()
    console.log('items fetched')

    await Promise.all(items.map(async item => {
            const new_item = new Item({
                name: item.name,
                description: item.description,
                price: item.price,
                number_in_stock: item.number_in_stock,
                category: item.category,
                photo: { path: 'public/images/blank-image.png'}, 
                _id: item._id
            })
            await Item.findByIdAndUpdate(item._id, new_item, {})
            console.log(`updated ${item.name}`)
    }))
    console.log('all items updated')
}