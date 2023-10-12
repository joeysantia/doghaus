import mongoose from "mongoose";
import Item from "./models/item.js"
import dotenv from 'dotenv'

mongoose.set("strictQuery", false)

dotenv.config()

main().catch(err => console.log(err))

async function main() {
    console.log('connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_KEY)
    console.log('connection successful')
    await addItems()
    console.log('all items successfully added')
    mongoose.connection.close()
    console.log('connection closed')
}

async function addItems() {
    //5 treats
    const items = [
        {
            name: 'Retractable Dog Leash',
            description: 'This retractable leash offers freedom and control by automatically adjusting as your dog walks-lengthening and shortening as needed.',
            price: 16.99,
            number_in_stock: 20,
            category: 'leash'
        },
        {
            name: 'Braided Rope Dog Leash',
            description: 'Crafted from rock climbing rope for a heavy duty hold. Strong handle with comfortable, non-slip padding helps with control and confidence.',
            price: 14.99,
            number_in_stock: 4,
            category: 'leash'
        },
        {
            name: 'Insulated Dog Parka',
            description: 'Special foil liner reflects body heat for extra warmth, making sure your pup is cozy. Breathable and water-resistant material ensures your pal stays comfortable and dry.',
            price: 64.99,
            number_in_stock: 17,
            category: 'clothing'
        },
        {
            name: 'Dog Ski Sweater',
            description: 'Cute, ski-themed style shows off your furry sidekick’s fashionable side. Doggy sweater helps keep your BFF warm on chilly days.',
            price: 21.99,
            number_in_stock: 5,
            category: 'clothing'
        },
        {
            name: 'Premium Grip Dog Shoes',
            description: 'These performance shoes are designed to help your pal walk on any kind of outdoor terrain. Rubberized micro-grips on the soles help provide extra traction on rugged surfaces.',
            price: 24.99,
            number_in_stock: 4,
            category: 'clothing'
        },
        {
            name: 'All-weather Waterproof Dog Raincoat',
            description: 'Designed with practical water-repellant fabric to provide a fully waterproof layer and a buttoned removable hood. Crafted with an adjustable chest and elastic binding at the cuffs to fit comfortably without restricting your pooch’s movement.',
            price: 38.99,
            number_in_stock: 16,
            category: 'clothing'
        },
        {
            name: 'Bacon Flavor Wishbone Chew Toy',
            description: 'Features a dog-friendly ergonomic design, so your pup can get a good grip every time. Delivers a wag-worthy flavor from real bacon that\'s fused all the way through the chew.',
            price: 13.99,
            number_in_stock: 4,
            category: 'toy'
        },
        {
            name: 'The Original Squeaky Plush Dog Toy',
            description: 'Includes an internal squeaker that makes every far-flung game of fetch even more entertaining. Wildly popular dog toy is a big hit with canine pals everywhere!',
            price: 2.99,
            number_in_stock: 12,
            category: 'toy'
        },
        {
            name: 'Roller Dog Toy',
            description: 'Innovative ball is super durable and double-molded to stand up to tough chewers. This will help ensure that your pet enjoys this toy for as long as possible.',
            price: 8.99,
            number_in_stock: 10,
            category: 'toy'
        },
        {
            name: 'Squeaker Ball Dog Toy',
            description: 'Interactive dog toy with loud squeaker inside and unique spiky texture. Made of BPA-free, food-grade TPR rubber so it’s safe to play with every day.',
            price: 2.99,
            number_in_stock: 6,
            category: 'toy'
        },
        {
            name: 'Tough Dog Chew Toy',
            description: 'Chew toy that combines real wood with synthetic strength, non-toxic, durable material with a natural wood smell that attracts and keeps dog’s interest for hours. Shape makes toss and fetch play easy, even floats in water!',
            price: 8.99,
            number_in_stock: 9,
            category: 'toy'
        },
        {
            name: 'Original Large Biscuit Dog Treats',
            description: 'Wholesome dog treats with an irresistible, meaty taste. Serve these morsels as a healthy snack anytime.',
            price: 14.99,
            number_in_stock: 10,
            category: 'treat'
        },
        {
            name: 'Thick Cut String with Real Bacon & Beef Dog Treats',
            description: 'USA-raised pork is the first ingredient in these tasty treats. Made with real bacon for the bacon treat pups prefer.',
            price: 10.99,
            number_in_stock: 11,
            category: 'treat'
        },
        {
            name: 'Bone Marrow Dog Treats',
            description: 'Baked with love in Buffalo, New York, USA. Colors from natural ingredients.',
            price: 9.99,
            number_in_stock: 5,
            category: 'treat'
        },
        {
            name: 'Peanut Butter Dog Treats',
            description: 'This delicious peanut butter recipe is soft and chewy, a great choice for puppies or older dogs who need a snack that’s easy on the teeth and gums. Crafted with whole wheat, peanut butter and non-fat milk—a low-fat, easy-to-digest reward for your pal.',
            price: 3.99,
            number_in_stock: 14,
            category: 'treat'
        },
        {
            name: 'Tender Beef Recipe Soft-Moist Training Dog Treats',
            description: 'Made with USA beef as the first ingredient so it’s high in protein and has the meaty flavor dogs love. Perfectly sized for training and is ideal for puppies or adult dogs; comes in an on-the-go ready bag that’s easy to take to the trainer’s or the park.',
            price: 5.99,
            number_in_stock: 7,
            category: 'treat'
        },
    ]

    await Promise.all(
        items.map(async item => {
            const newItem = new Item({
                name: item.name,
                description: item.description,
                price: item.price,
                number_in_stock: item.number_in_stock,
                category: item.category
            })
            await newItem.save()
            console.log(`Added item: ${newItem.name}`)
        })
    )
}