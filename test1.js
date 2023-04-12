const {
    MongoClient, ObjectId
} = require('mongodb')

const connectionUrl = "mongodb://127.0.0.1:27017"

const client = new MongoClient(connectionUrl)

const dbName = "CarsCrudApp"

async function main() {
    await client.connect()
    console.log("Connected");
    const db = client.db(dbName)
    const collection = db.collection("cars")

    //await addNewCar(collection)
    await updateCar(collection)
    await findAllCars(collection)


    //Examples
    return "done"
}

async function addNewCar(collection) {
    const newCar = {
        manufacturer: "Saab",
        model: "9000",
        year: 1999
    }



    const result = await collection.insertOne(newCar)

    console.log(result);
}
async function findAllCars(collection) {

    const findResult = await collection.find({}).toArray();
    console.log({findResult});
}
async function updateCar(collection) {
    const objectId = new ObjectId("6436635073b98f1396a8e334")

    const updateResult = await collection.updateOne({ _id: objectId }, { $set: { distance: 10000 } });
    console.log({updateResult});
}

main()
    .then(console.log("Ran main"))
    .catch((error) => console.error(error))
    .finally(() => client.close())