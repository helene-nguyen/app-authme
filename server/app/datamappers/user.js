//~import module
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class UserDataMapper extends CoreDataMapper {
  collectionName = 'user';

  async findUser(email) {
    const db = this.client.db(this.dbName);

    const collection = db.collection(this.collectionName);

    const result = await collection.find(email).toArray();

    return result[0];
  }
}

const User = new UserDataMapper(client);
export { User };
