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
                destination: 'https://discord.com/api/oauth2/authorize?client_id=416358583220043796&permissions=8&redirect_uri=https%3A%2F%2Fxenon.bot%2Finvited&scope=bot%20applications.commands&response_type=code',
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
            }
        ]
    }
}
