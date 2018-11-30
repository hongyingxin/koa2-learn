function pv(ctx){
    ctx.session.count ++;
    global.console.log('pv');
}

module.exports = function() {
    return async function(ctx,next){
        pv(ctx)
        await next();
    }
}