//~import module
import client  from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ArticleDataMapper extends CoreDataMapper {
  collectionName = 'articles';
}

const Article = new ArticleDataMapper(client);
export { Article };
