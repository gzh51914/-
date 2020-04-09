module.exports = {

    devServer: {
        proxy: {
            "/juanpi": {
                target: "https://webservice.juanpi.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/juanpi": "",
                }
            }
        }
    },

    publicPath: "./",
    productionSourceMap: false,

    css: {
        sourceMap: true,
    },


}


