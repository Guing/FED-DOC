## 介绍

verdaccio是一款开源轻量级的私有Npm源工具，简单来说你可以用它来搭建一个自己的Npm仓库，可以实现绝大部分Npm所提供的能力，[官方网站](https://verdaccio.org/)。

* 与 yarn, npm 和 pnpm 100% 兼容
* 提供 Docker 和 Kubernetes 支持，相当容易安装和使用
* 发布的包是私有的并且访问权限可配置
* Verdaccio 按需要缓存所有相关项，并在当地或私有网络下可以加速安装

## 安装

官网有详细的[安装教程](https://verdaccio.org/docs/en/installation)。笔者使用的是linux服务器，并且服务器有安装docker容器，所以这里使用docker安装Verdaccio，简单快捷。

```bash
docker pull verdaccio/verdaccio
```

## 运行

使用docker运行Verdaccio。

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

或者使用-v挂载本地数据卷。

```bash
docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v /data/verdaccio/conf:/verdaccio/conf \
  -v /data/verdaccio/storage:/verdaccio/storage \
  -v /data/verdaccio/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

### 注意

在官方提示中，建议使用docker volume而不是 bind mount：

> Verdaccio 在容器内以非root用户（uid=10001）运行，如果使用绑定挂载覆盖默认值，则需要确保挂载目录分配给正确的用户。在上面的例子中，你需要运行 sudo chown -R 10001:65533 /path/for/verdaccio 否则你会在运行时出现权限错误。建议使用docker volume而非使用 bind mount。

在实际操作中，为了方便，笔者使用docker volume，将/verdaccio/conf, /verdaccio/storage, /verdaccio/plugins挂载到主机的同一数据卷下时，会报这个错误：

```bash
Error: EACCES: permission denied, open '/verdaccio/conf/htpasswd'
```

解决的方法，就是将这三个目录挂载到不同的数据卷中，错误就会解决。

## 使用

### 使用nrm

nrm 是一个 NPM 源管理器，可以使用 nrm 在不同的源切换。

* 安装nrm

```bash
npm i nrm -g
```

* 查看nrm 源

```bash
nrm ls
```

```bash
  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/

```

* 添加或删除私有源

```bash
nrm add registry_name registry_url #添加源，registry_name为源的名称，registry_url为源的地址
nrm del registry_name #删除源
```

* 使用私有源

```bash
nrm use registry_name
```

### 登录私有源

再使用nrm切换到私有源之后，使用npm login登录私有源, 输入账号，密码，邮箱，就可以登录成功。

```bash
nrm use registry_name
npm login
```

### 发布包

在项目的根目录下执行npm publish就可以将包发布到私有源

```bash
npm publish
```

### 配置

在/verdaccio/conf中有一个config.yaml, 可以做相应的配置。如果使用docker数据卷挂载，则在数据卷目录中也会有相应的config.yaml，比如以上安装示例中，config.yaml就会出现在主机的/data/verdaccio/conf目录中。

配置文件：

```yaml

# 包含所有包的目录的路径
storage: /verdaccio/storage/data
# 包含所有包的插件的路径
plugins: /verdaccio/plugins
#显示的网页配置
web:
  # WebUI 默认启用，如果你想禁用它，只需取消注释这一行
  #enable: false
  title: Verdaccio
  # 禁用 gravatar 支持
  # gravatar: false
  # 默认情况下，包是的排序是上升的 (asc|desc)
  # sort_packages: asc
  # darkMode: true
  # logo: http://somedomain/somelogo.png
  # favicon: http://somedomain/favicon.ico | /path/favicon.ico

# 多语言支持
# i18n:
#  支持的语言列表在： https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
    # 允许注册的最大用户数，默认为 "+infinity".可以设置-1禁止注册用户。
    # max_users: 1000

# 上游服务器，表示如果你的库中没有此文件，可以去其他上游服务器拉取
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    # 表示是否开启缓存
    cache:true
    # 表示缓存多久后失效
    maxage:10m

packages:
 # 作用域包
  '@*/*':
    # 表示哪一类用户可以对匹配的项目进行安装
    # 可以使用三个关键字：“$all”、“$anonymous”、“$authenticated”
    # 也可以指定用户名/组名（取决于上面使用的身份验证插件,htpasswd）
    access: $all
    # 表示哪一类用户可以对匹配的项目进行发布
    publish: $authenticated
    # 表示哪一类用户可以对匹配的项目进行卸载包
    unpublish: $authenticated
    # 表示如果库中没有此包，此能过上面配置的npmjs去获取
    proxy: npmjs
 # 其他所有包
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

# 可以为传入连接指定 HTTP/1.1 服务器保持活动超时（以秒为单位）。
# 值为 0 使 http 服务器的行为类似于 8.0.0 之前的 Node.js 版本，后者没有保持活动超时
# 解决方法：通过给定的配置，您可以解决以下问题 https://github.com/verdaccio/verdaccio/issues/301。 如果 60 不够，则设置为 0。
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# 日志设置
logs: { type: stdout, format: pretty, level: http }

#环境配置
#experiments:
#  # 支持 npm token 指令
#  token: false
#  # 启用 tarball URL 重定向以使用不同的服务器托管 tarball，tarball_url_redirect 可以是模板字符串
#  tarball_url_redirect: 'https://mycdn.com/verdaccio/${packageName}/${filename}'
#  # 当使用 js 配置文件时，tarball_url_redirect 可以是一个函数，接受 packageName 和 filename 并返回 url
#  tarball_url_redirect(packageName, filename) {
#    const signedUrl = // generate a signed url
#    return signedUrl;
#  }

# 这会影响 web 和 api（尚未开发）
#i18n:
#web: en-US
```

### 权限配置

一般团队或者公司的私有项目，会采用不同的权限控制，配置文件的packages是配置包的权限的：

* 匹配包名
  + '@*/*' 表示带有@*/*的作用域包
  + ** 表示其他的所有包
  + 可以配置自己的包比如：'private-*', 'my-*'等等
* 操作权限：
  + access 表示哪一类用户可以对匹配的项目进行安装(install)
  + publish 表示哪一类用户可以对匹配的项目进行发布(publish) 
  + proxy 表示如果库中没有此包，此能过上面配置的npmjs去获取
* 用户权限：
  + $all 表示所有人都可以执行对应的操作
  + $authenticated 表示只有通过验证的人可以执行对应操作
  + $anonymous 表示只有匿名者可以进行对应操作（通常无用）
  + 这里可以写已经注册的用户名，做到精细化控制

#### 实际的权限配置场景

公司里有两个前端团队teamA和teamB，私有源上的所有包都可以安装，但是每个团队只能发布或移除自己团队的包。则可以使用以下配置。

```yaml

packages:
 # teamA
  '@teamA/*':
    access: $all
    publish: teamA-user1 teamA-user2 teamA-user3 
    unpublish: teamA-user1 teamA-user2 teamA-user3
    proxy: npmjs
  # teamB
  '@teamB/*':
    access: $all
    publish: teamB-user1 teamB-user2 teamB-user3 
    unpublish: teamB-user1 teamB-user2 teamB-user3
    proxy: npmjs
  # 其他所有包
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
```

因为是私有源，我们可以设置 config.yaml 中的 max_users: -1 来禁用 npm adduser 命令来创建用户。如果需要添加用户这里介绍两种方法：
* 可以通过安装 htpasswd-for-sinopia 来添加账号

```bash
npm install htpasswd-for-sinopia -g #全局安装htpasswd-for-sinopia
sinopia-adduser # 在 htpasswd 目录下执行
```

*  可以通过官方提供的工具来生成
[htpasswd-generator](https://hostingcanada.org/htpasswd-generator/)
，将生成的段字符串添加到 htpasswd 中即可。
