/**
 * 测试服务
 * - 初始化：在项目根目录进行 npm install
 * - 运行: 在项目根目录 node demo/app.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const resource = require('koa-static');

const fs = require('fs');
const path = require('path');

const app = new Koa();
app.use(resource(path.join(__dirname, '../extra')));
app.use(resource(path.join(__dirname, './views')));
app.use(resource(path.join(__dirname, '../src')));

// 主页路由
const viewRouter = new Router();
viewRouter.get('/', (ctx, next) => {

    ctx.response.type = 'html';
    ctx.response.body = fs.readFileSync(path.join(__dirname, './views/index.html'));
})
app.use(viewRouter.routes()).use(viewRouter.allowedMethods);


const start = () => {
    let port = 23410;

    app.listen(port);
    console.log('已经启动服务 - 端口为: ' + port + '! ');
}
start();