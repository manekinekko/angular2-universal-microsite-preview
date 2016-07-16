var _fakeLRUcount = 0;
export const StaticCache = {
  _cache: {},
  get: (key) => {
    let cache = StaticCache._cache[key];
    _fakeLRUcount++;
    if (_fakeLRUcount >= 10) {
      StaticCache.clear();
      _fakeLRUcount = 0;
    }
    return cache;
  },
  set: (key, data) => StaticCache._cache[key] = data,
  clear: () => StaticCache._cache = {}
};
