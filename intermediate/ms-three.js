function ms3(ctx){
    global.console.log('ms3');
}

module.exports = function() {
    return async function(ctx,next){
        global.console.log("ms3 start")
        ms3(ctx)
        await next();
        global.console.log("ms3 end")
    }
}