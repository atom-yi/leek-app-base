module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/leek': {
                target: 'http://127.0.0.1:8080/leek', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/leek': ''
                }
            }
        },
    }
}
