function ms2(ctx){
    global.console.log('ms2');
}

module.exports = function() {
    return async function(ctx,next){
        global.console.log("ms2 start")
        ms2(ctx)
        await next();
        global.console.log("ms2 end")
    }
}