### 本资源由 itjc8.com 收集整理
# 课程相关 Docker 命令

## docker 安装及设置

```bash
#安装 CentOS已经将Docker软件包放在了Extras软件源中，直接利用即可
yum install docker-io -y

#查看docker的版本 version
docker -v

#开启Docker服务
systemctl start docker.service

#开机启动Docker服务
systemctl enable docker.service

#查看Docker服务启动状态
systemctl status docker.service

#重启Docker服务
systemctl restart docker.service
```

## docker 镜像文件和容器命令
```bash
#查看所有镜像
docker images

#删除一个imageid的镜像
docker rmi [IMAE_ID] 

#删除所有镜像
sudo docker rmi $(docker images -q) 

#查看所有容器运行状态
docker ps -a    
docker container ls -all

#删除一个containerid的容器(实例)
docker rm 6f0c67de4b72 

#删除所有容器
docker rm $(sudo docker ps -a -q)

容器日志
#查看指定时间后的日志，只显示最后100行：
docker logs -f -t --since="2019-06-08" --tail=100 CONTAINER_ID

#查看某时间之后的日志：
docker logs -t --since="2019-06-08" CONTAINER_ID

#查看某时间段日志：
docker logs -t --since="2019-06-08" --until "2019-06-09" CONTAINER_ID

#查看最近30分钟的日志:
docker logs --since 30m CONTAINER_ID

# 设置启动策略, docker 容器自动启动（在容器退出或断电开机后，docker可以通过在容器创建时的 --restart 来指定重启策略）
#--restart 参数：
  # no，不自动重启容器. (默认值)
  # on-failure，  容器发生error而退出(容器退出状态不为0)重启容器,可以指定重启的最大次数，如：on-failure:10
  # unless-stopped，  在容器已经stop掉或Docker stoped/restarted的时候才重启容器，手动stop的不算
  # always， 在容器已经stop掉或Docker stoped/restarted的时候才重启容器
docker run --restart always -it -p {本机端口}:{容器端口} {镜像名称}

#如果容器已经被创建，但处于停止状态，重新启动：
docker start {容器ID}

#如果容器已经被创建，我们想要修改容器的重启策略
docker update --restart always {容器ID}
```




