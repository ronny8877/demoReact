/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["ui-sans-serif", "system-ui"],
			serif: ["ui-serif", "Georgia"],
			mono: ["ui-monospace", "SFMono-Regular"],
			ubuntu: ["Ubuntu", " sans-serif"],
			italianno: ["Italianno", "cursive"],
			montserrat: ["Montserrat", "sans-serif"],
			quickSand: ["QuickSand", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};