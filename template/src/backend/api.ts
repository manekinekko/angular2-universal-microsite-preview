// Our API for demos only
import {Database} from './db';
import {StaticCache} from './cache';

// Our API for demos only
export function serverApi(site) {
  let key = `${site}`;

  return (req, res) => {
    let cache = StaticCache.get(key);

    if (cache !== undefined) {
      console.log(`${key} Cache hit`);
      return res.json(cache);
    }
    console.log(`${key} Cache miss`);

    Database.get(key)
      .then(data => {
        StaticCache.set(key, data);
        return data;
      })
      .then(data => res.json(data));

  }
}
