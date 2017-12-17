var UtilsModule = function (){}

UtilsModule.prototype.commonMiddleware = function (req,res,next) {
	res.locals.starttime = new Date();
	res.locals.serverName = ConfigModule.serverName;
	res.locals.cache = false;
	next();
}


module.exports = UtilsModule;