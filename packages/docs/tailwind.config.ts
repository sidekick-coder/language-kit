import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    prefix: 'lk-',
    content: [
        "content/**/*.md",
        "layouts/**/*.vue",
        "components/**/*.vue",
    ],
    theme: {
        extend: {}
    }
}
