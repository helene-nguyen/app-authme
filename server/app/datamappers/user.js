//~import module
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class UserDataMapper extends CoreDataMapper {
  collectionName = 'user';

  async findUser(email) {
    
    const database = this.client.db(this.dbName);
      const collection = database.collection(this.collectionName);

      const result = await collection.findOne({ email });
      return result;
  }
}

const User = new UserDataMapper(client);
export { User };
