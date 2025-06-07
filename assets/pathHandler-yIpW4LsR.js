class PathHandler {
  constructor() {
  }
  /**
   * 替换路径系统关键字
   * 关键字列表：
   * site.name 站点名称
   * site.host 站点域名
   * YYYY 年份
   * MM 月份
   * DD 日期
   * @param {*} path
   */
  replacePathKey(path, site) {
    if (!path) {
      return path;
    }
    const now = /* @__PURE__ */ new Date();
    return this.replaceKeys(path, {
      "site.name": site.name,
      "site.host": site.host,
      YYYY: now.getFullYear(),
      MM: ("0" + (now.getMonth() + 1).toString()).substr(-2),
      DD: ("0" + now.getDate().toString()).substr(-2)
    });
  }
  /**
   * 获取保存路径
   * @param {*} sourcePath
   */
  getSavePath(sourcePath, site) {
    if (!sourcePath) {
      return void 0;
    }
    let path = sourcePath;
    let key = "<...>";
    if (path) {
      if (path.indexOf(key) >= 0) {
        let tmp = window.prompt(
          `当前为自定义路径：${path} 
请输入路径中 ${key} 部分的内容: `
        );
        if (tmp === null) {
          return false;
        }
        path = path.replace(key, tmp);
      }
    }
    return this.replacePathKey(path, site);
  }
  replaceKeys(source, keys) {
    let result = source;
    for (const key in keys) {
      if (keys.hasOwnProperty(key)) {
        const value = keys[key];
        result = result.replace("$" + key + "$", value);
      }
    }
    return result;
  }
}
export {
  PathHandler as P
};
