/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app/**/*.{js,vue,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                exo: ['Exo 2', 'sans-serif'],
                'space-mono': ['Space Mono', 'monospace']
            },
            colors: {
                cyber: {
                    dark: '#050505',
                    darker: '#0a0a0a',
                    grid: '#1a1a1a',
                    accent: '#00ffff',
                    'accent-dim': '#00cccc',
                    glow: '#00ffff80'
                }
            },
            backdropBlur: {
                xs: '2px'
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(0, 255, 255, 0.3)',
                'glow-md': '0 0 20px rgba(0, 255, 255, 0.4)',
                'glow-lg': '0 0 30px rgba(0, 255, 255, 0.5)',
                'card': '0 8px 32px rgba(0, 0, 0, 0.5)'
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' }
                }
            }
        }
    },
    plugins: []
}