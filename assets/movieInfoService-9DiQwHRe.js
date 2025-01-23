import { P as PPF } from "./index-BwFzq1Q7.js";
class MovieInfoService {
  constructor() {
    this.omdbApiURL = "https://www.omdbapi.com";
    this.omitApiURL = "https://omit.mkrobot.org";
    this.doubanApiURL = "https://api.douban.com/v2";
    this.doubanFrodoApi = "https://frodo.douban.com/api/v2";
    this.douban = {
      frodo: {
        apiKeys: [
          "054022eaeae0b00e0fc068c0c0a2102a"
        ],
        entApiKeys: [
          "054022eaeae0b00e0fc068c0c0a2102a"
        ],
        // 豆瓣 frodo 接口相关方法
        methods: {
          movie: {
            search: `${this.doubanFrodoApi}/search?q=$key$&count=$count$&apiKey=$apikey$`,
            /*
              数据示例
              request: https://movie.douban.com/j/subject_suggest?q=tt0120762
              response:
              [{
                "episode": "",
                "img": "https://img9.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2443062814.jpg",
                "title": "花木兰",
                "url": "https:\/\/movie.douban.com\/subject\/1294833\/?suggest=tt0120762",
                "type": "movie",
                "year": "1998",
                "sub_title": "Mulan",
                "id": "1294833"
              }]
            */
            imdb: `${this.omitApiURL}/movie/infos/$imdbid$`,
            subject: `${this.omitApiURL}/movie/infos/douban$id$`
            // imdb: `https://movie.douban.com/j/subject_suggest?q=$imdbid$`,
            // subject: `${this.doubanFrodoApi}/movie/$id$?apiKey=$apikey$`
          }
        }
      },
      common: {
        apiKeys: [
          "02646d3fb69a52ff072d47bf23cef8fd",
          "0b2bdeda43b5688921839c8ecb20399b",
          "0dad551ec0f84ed02907ff5c42e8ec70",
          "0df993c66c0c636e29ecbb5344252a4a"
        ],
        entApiKeys: [
          "0dad551ec0f84ed02907ff5c42e8ec70",
          "02646d3fb69a52ff072d47bf23cef8fd"
        ],
        methods: {
          movie: {
            search: `${this.doubanApiURL}/movie/search?q=$key$&count=$count$&apikey=$apikey$`,
            imdb: `${this.doubanApiURL}/movie/imdb/$imdbid$?apikey=$apikey$`,
            subject: `${this.doubanApiURL}/movie/subject/$id$?apikey=$apikey$`
          }
        }
      }
    };
    this.omdbApiKeys = [
      "e0d3039d",
      "a67d9bce",
      "6be019fc",
      "4ee790e0",
      "d82cb888",
      "d58193b6",
      "15c0aa3f",
      "53acf36d",
      "3a864b75",
      "2892ab46",
      "b507af90",
      "7cf67120",
      "85b2a90c",
      "2896ff0a",
      "aa4b9983",
      "c4e08870",
      "5d5c0049",
      "79a462f2",
      "e4c3fce8",
      "918d70df",
      "e94cb667",
      "eb84d6d7",
      "e192b5a",
      "d62b4cf5",
      "5e6442a3",
      "9b1468c6"
    ];
    this.doubanApiKeys = [
      "02646d3fb69a52ff072d47bf23cef8fd",
      "0b2bdeda43b5688921839c8ecb20399b",
      "0dad551ec0f84ed02907ff5c42e8ec70",
      "0df993c66c0c636e29ecbb5344252a4a"
      // "07c78782db00a121175696889101e363"
    ];
    this.doubanEntApiKeys = [
      "0dad551ec0f84ed02907ff5c42e8ec70",
      "02646d3fb69a52ff072d47bf23cef8fd"
      // "07c78782db00a121175696889101e363"
    ];
    this.omitApiKeys = ["kiqMY6MC"];
    this.cache = {
      base: {},
      ratings: {},
      doubanToIMDb: {},
      search: {},
      tmdbToIMDb: {}
    };
    this.timeout = 3e3;
    this.doubanApi = this.douban.frodo;
    this.requsetQueue = {};
  }
  getInfos(key) {
    if (/(douban\d+)/.test(key)) {
      return this.getInfoFromDoubanId(key.replace("douban", ""));
    }
    if (/^(tt\d+)$/.test(key)) {
      return this.getInfoFromIMDb(key);
    }
    return new Promise((resolve, reject) => {
      reject("暂未实现");
    });
  }
  /**
   * 判断是否为 IMDbId
   * @param IMDbId
   */
  isIMDbId(IMDbId) {
    return /^(tt\d+)$/.test(IMDbId);
  }
  /**
   * 根据指定的 IMDbId 获取电影信息
   * @param IMDbId
   */
  getInfoFromIMDb(IMDbId) {
    return new Promise((resolve, reject) => {
      if (this.isIMDbId(IMDbId)) {
        let cache = this.cache.base[IMDbId];
        if (cache) {
          resolve(cache);
          return;
        }
        let url = PPF.replaceKeys(this.doubanApi.methods.movie.imdb, {
          imdbid: IMDbId,
          apikey: this.getDoubanApiKey()
        });
        $.ajax({
          url,
          timeout: this.timeout
        }).done((json) => {
          let result;
          if (json) {
            result = json.data || json;
          }
          this.cache.base[IMDbId] = result;
          resolve(result);
        }).fail((error) => {
          reject(error);
        });
      } else {
        reject("error IMDbId");
      }
    });
  }
  /**
   * 根据豆瓣ID获取影片信息
   * @param id
   */
  getInfoFromDoubanId(id) {
    return new Promise((resolve, reject) => {
      if (/^(\d+)$/.test(id)) {
        let cache = this.cache.base[id];
        if (cache) {
          resolve(cache);
          return;
        }
        let url = PPF.replaceKeys(this.doubanApi.methods.movie.subject, {
          id,
          apikey: this.getDoubanApiKey()
        });
        $.ajax({
          url,
          timeout: this.timeout
        }).done((json) => {
          let result;
          if (json) {
            result = json.data || json;
          }
          this.cache.base[id] = result;
          resolve(result);
        }).fail((error) => {
          reject(error);
        });
      } else {
        reject("error douban id");
      }
    });
  }
  /**
   * 获取评分信息
   * @param IMDbId
   */
  getRatings(IMDbId) {
    return new Promise((resolve, reject) => {
      if (this.isIMDbId(IMDbId)) {
        let cache = this.cache.ratings[IMDbId];
        if (cache) {
          resolve(cache);
          return;
        }
        let requestCount = 0;
        const request = () => {
          let apikey = this.getOmdbApiKey();
          let url = `${this.omdbApiURL}/?i=${IMDbId}&apikey=${apikey}&tomatoes=true`;
          $.ajax({
            url,
            timeout: this.timeout
          }).done((json) => {
            if (json && json.Error) {
              requestCount++;
              if (requestCount >= 5) {
                reject(json);
                return;
              }
              this.removeApiKey("omdb", apikey);
              request();
              return;
            }
            this.cache.ratings[IMDbId] = json;
            resolve(json);
          }).fail((error) => {
            reject(error);
          });
        };
        request();
      } else {
        reject("error IMDbId");
      }
    });
  }
  /**
   * 从OMDb apikey列表中随机获取一个key
   */
  getOmdbApiKey() {
    return this.omdbApiKeys[Math.floor(Math.random() * this.omdbApiKeys.length)];
  }
  /**
   * 从豆瓣apikey列表中随机获取一个key
   */
  getDoubanApiKey() {
    return this.doubanApi.apiKeys[Math.floor(Math.random() * this.doubanApi.apiKeys.length)];
  }
  /**
   * 获取用于查询的apikey
   */
  getDoubanEntApiKey() {
    return this.doubanApi.entApiKeys[Math.floor(Math.random() * this.doubanApi.entApiKeys.length)];
  }
  /**
   * 根据TMDB ID获取 IMDb ID
   * @param source
   * @returns 
   */
  async getIMDbIdFromTMDB(source) {
    const options = Object.assign({
      id: 0,
      type: "movie"
    }, source);
    if (!options.id) {
      return "";
    }
    const cacheKey = `${options.type}.${options.id}`;
    let cache = this.cache.tmdbToIMDb[cacheKey];
    if (cache) {
      return cache;
    }
    let url = `${this.omitApiURL}/movie/${options.id}/tmdb.${options.type}/imdb`;
    if (this.requsetQueue[url]) {
      return;
    }
    this.requsetQueue[url] = true;
    try {
      const response = await fetch(url);
      delete this.requsetQueue[url];
      if (response.ok) {
        const result = await response.json();
        if (result && result.data) {
          this.cache.tmdbToIMDb[cacheKey] = result.data;
          return result.data;
        }
      } else {
        throw new Error(`HTTP 错误！状态码：${response.status}`);
      }
    } catch (error) {
    }
    delete this.requsetQueue[url];
    return false;
  }
  /**
   * 根据指定的 doubanId 获取 IMDbId
   * @param doubanId
   */
  getIMDbIdFromDouban(doubanId) {
    return new Promise((resolve, reject) => {
      let cache = this.cache.doubanToIMDb[doubanId];
      if (cache) {
        resolve(cache);
        return;
      }
      let url = `${this.omitApiURL}/movie/${doubanId}/douban/imdb`;
      if (this.requsetQueue[url]) {
        reject();
        return;
      }
      this.requsetQueue[url] = true;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        console.log("getIMDbIdFromDouban", json);
        if (json.data) {
          this.cache.doubanToIMDb[doubanId] = json.data;
          resolve(json.data);
        } else {
          reject(json);
        }
      }).fail((error) => {
        reject(error);
      }).always(() => {
        delete this.requsetQueue[url];
      });
    });
  }
  /**
   * 查询指定关键的影片信息
   * @param key
   * @param count
   */
  queryMovieInfoFromDouban(key, count = 5) {
    if (this.isIMDbId(key)) {
      return this.getInfoFromIMDb(key);
    }
    return new Promise((resolve, reject) => {
      let cache = this.cache.search[key];
      if (cache) {
        resolve(cache);
        return;
      }
      let url = `${this.omitApiURL}/movie/search/${key}`;
      if (this.requsetQueue[url]) {
        reject();
        return;
      }
      this.requsetQueue[url] = true;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        console.log("queryMovieInfoFromDouban", json);
        if (json.data) {
          this.cache.search[key] = json.data;
          resolve(json.data);
        } else {
          reject(json);
        }
      }).fail((error) => {
        reject(error);
      }).always(() => {
        delete this.requsetQueue[url];
      });
    });
  }
  /**
   * 追加API Key
   * @param type
   * @param keys
   */
  appendApiKey(type = "", keys) {
    let apiKeys;
    switch (type) {
      case "omdb":
        apiKeys = this.omdbApiKeys;
        break;
      case "douban":
        apiKeys = this.doubanApiKeys;
        break;
    }
    keys.forEach((key) => {
      if (key && !apiKeys.includes(key)) {
        apiKeys.push(key);
      }
    });
  }
  /**
   * 移除指定的Key
   * @param type
   * @param key
   */
  removeApiKey(type = "", key) {
    let apiKeys = [];
    switch (type) {
      case "omdb":
        apiKeys = this.omdbApiKeys;
        break;
      case "douban":
        apiKeys = this.doubanApiKeys;
        break;
    }
    let index = apiKeys.findIndex((item) => {
      if (item === key) {
        return true;
      }
    });
    if (index !== -1) {
      apiKeys.splice(index, 1);
    }
  }
  /**
   * 验证 OMDB API Key
   * @param key
   */
  verifyOmdbApiKey(key) {
    return new Promise((resolve, reject) => {
      let url = `${this.omdbApiURL}/?i=tt0111161&apikey=${key}&tomatoes=true`;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        if (json && json.Error) {
          reject(json.Error);
          return;
        }
        resolve();
      }).fail((error) => {
        reject(error);
      });
    });
  }
  /**
   * 验证豆瓣Api Key
   * @param key
   */
  verifyDoubanApiKey(key) {
    return new Promise((resolve, reject) => {
      let url = `${this.doubanApiURL}/movie/imdb/tt0111161?apikey=${key}`;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        if (json && json.title) {
          resolve();
        } else {
          reject(json.Error);
        }
      }).fail((error) => {
        reject(error);
      });
    });
  }
  /**
   * 获取热门搜索
   * @param count 需要获取的数量，最多为100
   */
  getTopSearches(count = 9) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.omitApiURL}/movie/top/${count}?apikey=${this.omitApiKeys[0]}`,
        timeout: this.timeout
      }).then((result) => {
        if (result == null ? void 0 : result.data) {
          resolve(result.data);
        } else {
          reject();
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
export {
  MovieInfoService as M
};
