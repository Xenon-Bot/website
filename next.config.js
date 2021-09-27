const {i18n} = require('./next-i18next.config');

module.exports = {
    reactStrictMode: true,
    i18n,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL_INTERNAL}/:path*`,
            },
        ]
    },
}
