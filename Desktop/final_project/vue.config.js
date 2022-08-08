module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://120.46.200.79:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}