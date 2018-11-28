function ms1(ctx){
    global.console.log('ms1');
}

module.exports = function() {
    return async function(ctx,next){
        global.console.log("ms1 start")
        ms1(ctx)
        await next();
        global.console.log("ms1 end")
    }
}