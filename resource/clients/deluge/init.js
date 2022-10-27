/**
 * @see https://deluge.readthedocs.io/en/develop/reference/index.html
 */
(function ($) {
  //Deluge
  // id:1,method:auth.login,params:[url,null]
  // 380 web.download_torrent_from_url
  // 2 core.add_torrent_url
  class Deluge {
    /**
     * 初始化实例
     * @param {*} options
     * loginName: 登录名
     * loginPwd: 登录密码
     * url: 服务器地址
     */
    init(options) {
      this.options = options;
      this.requestCount = -1;

      if (this.options.address.indexOf("/json") == -1) {
        let url = PTServiceFilters.parseURL(this.options.address);
        let address = [url.protocol, "://", url.host];
        if (url.port) {
          address.push(`:${url.port}`);
        }

        address.push(url.path);
        if (url.path.substr(-1) != "/") {
          address.push("/");
        }

        address.push("json");
        this.options.address = address.join("");
      }
      console.log("Deluge.init", this.options.address);
    }

    /**
     * 执行指定的操作
     * @param {*} action 需要执行的执令
     * @param {*} data 附加数据
     * @return Promise
     */
    call(action, data) {
      console.log("Deluge.call", action, data);
      return new Promise((resolve, reject) => {
        switch (action) {
          case "addTorrentFromURL":
            this.addTorrentFromUrl(data, result => {
              resolve(result);
            });
            break;

          // 测试是否可连接
          case "testClientConnectivity":
            this.getSessionId()
              .then(result => {
                resolve(result != "");
              })
              .catch(result => {
                reject(result);
              });
            break;
        }
      });
    }

    /**
     * 获取Session
     * @param {*} callback
     */
    getSessionId(callback) {
      return new Promise((resolve, reject) => {
        var data = {
          id: ++this.requestCount,
          method: "auth.login",
          params: [this.options.loginPwd]
        };

        $.ajax({
          type: "POST",
          url: this.options.address,
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(data),
          timeout: PTBackgroundService.options.connectClientTimeout
        })
          .done((resultData, textStatus) => {
            this.isInitialized = true;
            if (callback) {
              callback(resultData);
            }
            resolve(this.token);
          })
          .fail((jqXHR, textStatus) => {
            let result = {
              status: textStatus || "error",
              code: jqXHR.status,
              msg: textStatus === "timeout" ? i18n.t("downloadClient.timeout") : i18n.t("downloadClient.unknownError") //"连接超时" : "未知错误"
            };
            switch (jqXHR.status) {
              case 0:
                result.msg = i18n.t("downloadClient.serverIsUnavailable") //"服务器不可用或网络错误"
                break;

              case 401:
                result.msg = i18n.t("downloadClient.serverConnectionFailed"); //"身份验证失败";
                break;

              case 404:
                result.msg = i18n.t("downloadClient.notFound"); //"指定的地址未找到，服务器返回了 404";
                break;
            }
            reject(result);
          });
      });
    }

    /**
     * 调用指定的RPC
     * @param {*} options
     * @param {*} callback
     * @param {*} tags
     */
    exec(options, callback, tags) {
      var data = {
        id: ++this.requestCount
      };

      $.extend(data, options);

      var settings = {
        type: "POST",
        url: this.options.address,
        data: JSON.stringify(data),
        contentType: "application/json",
        timeout: PTBackgroundService.options.connectClientTimeout,
        success: (resultData, textStatus) => {
          // 未认证
          if (resultData && resultData.error && resultData.error.code == 1) {
            this.getSessionId()
              .then(() => {
                this.exec(options, callback, tags);
              })
              .catch(result => {
                callback && callback(result);
              });
            return;
          }
          if (callback) {
            callback(resultData, tags);
          }
        },
        error: (request, event, page) => {
          console.log(request);
          this.getSessionId()
            .then(() => {
              this.exec(options, callback, tags);
            })
            .catch(result => {
              callback && callback(result);
            });
        }
      };
      $.ajax(settings);
    }

    /**
     * 添加种子链接
     * @param {*} data
     * @param {*} callback
     */
    addTorrentFromUrl(data, callback) {
      let url = data.url;

      // 磁性连接（代码来自原版WEBUI）
      if (url.startsWith('magnet:')) {
        this.addTorrent({
            method: "core.add_torrent_url",
            params: [
              url,
              {
                download_location: data.savePath
              }
            ]
          },
          callback
        );
        return;
      }

      PTBackgroundService.requestMessage({
        action: "getTorrentDataFromURL",
        data: url
      })
        .then(result => {
          var fileReader = new FileReader();

          fileReader.onload = e => {
            var contents = e.target.result;
            var key = "base64,";
            var index = contents.indexOf(key);
            if (index == -1) {
              return;
            }
            var metainfo = contents.substring(index + key.length);

            this.addTorrent({
              method: "core.add_torrent_file",
              params: [
                "",
                metainfo,
                {
                  download_location: data.savePath
                }
              ]
            },
              callback
            );
          };
          fileReader.readAsDataURL(result);
        })
        .catch(result => {
          callback && callback(result);
        });
    }

    addTorrent(options, callback) {
      this.exec(options, resultData => {
        if (callback) {
          var result = resultData;
          if (!resultData.error && resultData.result) {
            result.status = "success";
            result.msg = i18n.t("downloadClient.addURLSuccess", {
              name: this.options.name
            }); //"URL已添加至 Deluge 。";
          }
          callback(result);
        }
        console.log(resultData);
      });
    }
  }

  window.deluge = Deluge;
})(jQuery, window);