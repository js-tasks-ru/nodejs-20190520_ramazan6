const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

var subscribers = [];

router.get('/subscribe', async (ctx, next) => {
	await new Promise(function(resolve, reject) {
		ctx.resolve = resolve;
		subscribers.push(ctx);
	})
});

router.post('/publish', async (ctx, next) => {
    if (!ctx.request.body.message) {
	  ctx.status = 400;
	  return;
	}

	for (let i = 0; i < subscribers.length; i++) {
		subscribers[i].body = ctx.request.body.message;
		subscribers[i].resolve();
	}
	ctx.status = 201;
	subscribers.length = 0;
});

app.use(router.routes());

module.exports = app;
