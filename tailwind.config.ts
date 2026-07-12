export default module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: { screens: { 'xxs': '320px', 'xs': '360px' }}
    },
    images: {
        domain: ['media.rawg.io'],
    },
    plugins: []
}