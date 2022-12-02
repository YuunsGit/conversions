/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        octocat: {
            octocat: "url('/img/octocat.svg')",
        },
    },
    plugins: [],
};
