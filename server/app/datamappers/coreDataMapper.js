//~import modules
import pkg from 'mongodb';
const { ObjectId, Schema } = pkg;
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
    const isIdValid = ObjectId.isValid(id);
    let result;

    isIdValid ? result = await collection.find(ObjectId(id)).toArray() : result = [false];

    return result[0];
  }

  async create(inputData) {

    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(inputData);

    if (!result.acknowledged) return null;

    return result.acknowledged;
  }

  async update(userId, inputData) {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.updateOne(ObjectId(userId), { $set: inputData });

    if (!result.acknowledged) return null;

    return result.acknowledged;
  }

  async delete(userId) {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.deleteOne(userId);

    if (!result.acknowledged) return null;

    return result.acknowledged;
  }
}

export { CoreDataMapper };
