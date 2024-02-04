#!/bin/bash
set -e
cd shipmgr
gf build main.go -a amd64 -s linux -p ./temp
gf docker main.go -tn shipmgr:latest -tp drkuma -p
now=$(date +"%Y%m%d%H%M%S")
# 以当前时间为版本号
docker tag drkuma/shipmgr:latest drkuma/shipmgr:$now
docker push drkuma/shipmgr:$now
echo "release success" $now
# 写入发布日志 release.log
echo $now >> release.log
sleep 10s