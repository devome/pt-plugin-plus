#!/usr/bin/env bash

## 需要补充自己的GITHUB_TOKEN，或直接以 `GITHUB_TOKEN=XXX ./ptpp.sh` 来运行
GITHUB_TOKEN=

## 需要在上一层目录创建好pt-plugin-plus仓库并已经初始化
dir_shell=$(cd $(dirname $0); pwd)
dir_ptpp=$(cd "$dir_shell"; cd ../../pt-plugin-plus; pwd)
dir_tmp="/tmp/ptpp"

cd $dir_shell

## 临时下载文件
[[ ! -d $dir_tmp ]] && mkdir $dir_tmp
ptpp_tmp=$(mktemp $dir_tmp/XXXXXX.zip)

## artifacts基础网址
art_url="https://api.github.com/repos/pt-plugins/PT-Plugin-Plus/actions/artifacts"
repository_id=161980047

## 获取artifacts清单
art_list=$(curl -sSL -H "Accept: application/vnd.github+json" -H "Authorization: Bearer $GITHUB_TOKEN" "$art_url")
art_name=( $(echo "$art_list" | jq -r .artifacts[].name) )
art_dlurl=( $(echo "$art_list" | jq -r .artifacts[].archive_download_url) )
art_sha=( $(echo "$art_list" | jq -r .artifacts[].workflow_run.head_sha) )
art_headid=( $(echo "$art_list" | jq -r .artifacts[].workflow_run.head_repository_id) )

## 获取最新zip的相关信息
for ((i=0; i<${#art_name[@]}; i++)); do
    if [[ ${art_name[i]} == dev-build-*-zip && ${art_headid[i]} == $repository_id ]]; then
        ptpp_dlurl=${art_dlurl[i]}
        ptpp_sha=${art_sha[i]}
        ptpt_ver=$(echo "${art_name[i]}" | sed -e 's|dev-build-||' -e 's|-zip||')
        break
    fi
done

## 下载最新的dev-zip
if [[ $(cat ptpp.sha 2>/dev/null) != $ptpp_sha ]]; then
    curl "$ptpp_dlurl" -sSL -H "Accept: application/vnd.github+json" -H "Authorization: Bearer $GITHUB_TOKEN" -o "$ptpp_tmp" && {
        echo "$ptpp_sha" > ptpp.sha
        cd "$dir_ptpp"
        unzip -oqq "$ptpp_tmp" -d $dir_tmp
        filezip=$(unzip -l $ptpp_tmp | awk '$4~/.+\.zip/{print $4}')
        git checkout master
        rm -rf "$dir_ptpp"/*
        unzip -oqq $dir_tmp/"$filezip" -d "$dir_ptpp"
        git add . && git commit -m "$ptpp_sha" && git push
        git branch -d dev
        git push origin --delete dev
        git checkout --orphan dev
        git rm -rf . &>/dev/null
        unzip -oqq $dir_tmp/"$filezip" -d "$dir_ptpp"
        git add . && git commit -m "$ptpt_ver" && git push -u origin dev
        rm -rf $dir_tmp/"$filezip"
    }
    rm -rf "$ptpp_tmp"
else
    echo "The last commit sha256 $ptpp_sha is not change."
fi

