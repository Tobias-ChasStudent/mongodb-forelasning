const {
    MongoClient,
    ObjectId
} = require('mongodb')

const connectionUrl = process.env.MONGODB_URL

const client = new MongoClient(connectionUrl)

const dbName = "CarsCrudApp"

async function getCarsCollection() {
    await client.connect()
    console.log("Connected");
    const db = client.db(dbName)
    const collection = db.collection("cars")
    return collection
}

module.exports.getCars = async() => {
    const collection = await getCarsCollection()
    
    const findResult = await collection.find({}).toArray();  
    
    return findResult
}

module.exports.insertCar = async (newCar) => {
    const collection = await getCarsCollection()

    await collection.insertOne(newCar)
}

module.exports.getCarById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection()
    const car = await collection.findOne({
        _id: objectId
    })
    return car
}

module.exports.updateCarById = async (id, updatedCar) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection()
    await collection.updateOne({
        _id: objectId
    }, {
        $set: updatedCar
    })
}
module.exports.deleteCarById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getCarsCollection()
    await collection.deleteOne({
        _id: objectId
    })
}