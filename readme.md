本仓库将 https://github.com/pt-plugins/PT-Plugin-Plus 通过Action构建的dev版本每天自动转换为git仓库，方便用户自动更新。

## 使用

1. 克隆本仓库（需要安装git，Linux用户自行安装，Windows请下载安装：https://gitforwindows.org/）
```shell
cd ~  # 你可以指定为其他目录，如为其他目录，下面所有路径均作调整
git clone -b dev https://github.com/devome/pt-plugin-plus.git
```

2. 打开`chrome://extensions`或`edge://extensions`，勾选左侧`开发人员模式`，点击`加载已解压的扩展程序...`，选择刚刚克隆的目录`~/pt-plugin-plus`即可。

## 自动更新

### Linux

新建一个脚本，内容如下，然后将脚本加入crontab即可（注意需要可执行权限）：

```shell
#!/usr/bin/env bash

cd ~/pt-plugin-plus
git fetch
git reset origin/dev --hard
git pull
```

### Windows

新建一个cmd脚本，内容如下，然后将该脚本加入任务计划中即可。任务计划如何添加请参考：https://blog.csdn.net/qq_41587516/article/details/112446587

```bat
cd ~\pt-plugin-plus
git fetch
git reset origin/dev --hard
git pull
```
