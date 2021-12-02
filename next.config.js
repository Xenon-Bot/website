const {i18n} = require('./next-i18next.config');

module.exports = {
    reactStrictMode: true,
    i18n,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL_INTERNAL}/:path*`,
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/discord',
                destination: 'https://discord.gg/5GmAsPs',
                permanent: false
            },
            {
                source: '/support',
                destination: 'https://discord.gg/5GmAsPs',
                permanent: false
            },
            {
                source: '/invite',
                destination: `${process.env.API_URL_EXTERNAL}/v1/auth/invite`,
                permanent: false,
            },
            {
                source: '/premium/invite',
                destination: `${process.env.API_URL_EXTERNAL}/v1/auth/invite`,
                permanent: false,
            },
            {
                source: '/patreon',
                destination: 'https://www.patreon.com/merlinfuchs',
                permanent: false
            },
            {
                source: '/docs',
                destination: 'https://wiki.xenon.bot',
                permanent: false
            },
            {
                source: '/twitter',
                destination: 'https://twitter.com/xenon_bot',
                permanent: false
            },
            {
                source: '/blog',
                destination: 'https://blog.xenon.bot',
                permanent: false
            },
            {
                source: '/medium',
                destination: 'https://blog.xenon.bot',
                permanent: false
            },
            {
                source: '/ads.txt',
                destination: 'https://api.nitropay.com/v1/ads-593.txt',
                permanent: true
            },
            {
                source: '/privacy',
                destination: 'https://www.iubenda.com/privacy-policy/88601334/legal',
                permanent: false
            }
        ]
    }
}
