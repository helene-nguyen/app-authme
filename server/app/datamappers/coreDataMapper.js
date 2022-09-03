//~import modules
import pkg from 'mongodb';
const { ObjectId } = pkg;
class CoreDataMapper {
  dbName = 'authme';
  collectionName;

  constructor(client) {
    this.client = client;
  }

  async findAll() {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.find().toArray();

    return result;
  }

  async findOne(id) {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    //~test if id is "a string of 12 bytes or a string of 24 hex characters or an integer"
    if (ObjectId.isValid(id) === false) return null;
    const result = await collection.findOne({ _id: new ObjectId(id) });

    return result;
  }

  async create(inputData) {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(inputData);

    if (!result.acknowledged) return null;

    return result.acknowledged;
  }

  //& Update
  async updateOne(id, inputData) {
    const database = this.client.db(this.dbName);
    const collection = database.collection(this.collectionName);

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: inputData });

    return result;
  }

  //& Delete
  async delete(id) {
    const database = this.client.db(this.dbName);
    const collection = database.collection(this.collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}

export { CoreDataMapper };
