const {createProxyMiddleware} =require('http-proxy-middleware');

// registering proxies for the below endpoints, 
// this setup does not come into play in prod, cos client side code is bundled and served by the express server itself.
module.exports=function(app){

    // added proxy for adding credits
    app.use(["/api/*","/auth/*"],createProxyMiddleware({
        target: "http://localhost:5000"
    }));
};