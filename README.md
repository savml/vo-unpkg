vo-unpkg

搭配npm私服查看文件

1  获取下载地址

```
npm info vo-unpkg | grep tarball
```

2 下载解压后执行安装

```
npm i --production
```

3 配置

```
export NPM_REGISTRY_URL=http://localhost:4873
export NODE_ENV=production
export PORT=4874
```

4 启动

```
pm2 ./server
```

5 访问

```
http://localhost:4874/browse/packageName
```

6 编译

```
export NODE_ENV=production
npm run build
npm publish --registry=https://registry.npmjs.org/
```
