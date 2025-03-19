/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{html,js,ts,jsx,tsx,mdx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                cafe24: ["Cafe24Shiningstar", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
