module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                theme: {
                    lightest: '#3b3c64',
                    lighter: '#333457',
                    light: '#2b2c4a',
                    dark: '#23243c',
                    darker: '#1c1c2f',
                    darkest: '#141421'
                }
            },
            height: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '176': '44rem',
                '192': '48rem',
                '208': '52rem',
                '224': '56rem',
                '240': '60rem',
                '256': '64rem',
                '304': '76rem'
            },
            width: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '176': '44rem',
                '192': '48rem',
                '208': '52rem',
                '224': '56rem',
                '240': '60rem',
                '256': '64rem',
                '304': '76rem'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
