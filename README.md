vo-unpkg

搭配npm私服查看文件

1  获取下载地址
npm info vo-unpkg | grep tarball

2 下载解压后执行安装
npm i --production

3 运行
export NPM_REGISTRY_URL=http://
export NODE_ENV=production
export PORT=你给的端口

pm2 启动下server
