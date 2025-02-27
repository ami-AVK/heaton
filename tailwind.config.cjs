module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		"slide-from-top",
		"a-delay-0",
		"a-delay-1",
		"a-delay-2",
		"a-delay-3",
		"a-delay-4",
		"a-delay-5",
		"a-delay-6",
	],
	theme: {
		fontFamily: {
			'sans': ['Ubuntu Sans','ui-sans-serif', 'system-ui'],
			'serif': ['ui-serif', 'Georgia'],
			'mono': ['Ubuntu Sans Mono','ui-monospace', 'SFMono-Regular'],
		},
		extend: {
			blur:{
				"4xl": "128px",
			},
			colors: {
				'primary':{
					DEFAULT:"var(--primary,#D43B18)",
					10:"var(--primary-10,#D43B18)",
					20:"var(--primary-20,#D43B18)",
					// 100:"#DDD7D1",
					// 200:"#CEC2B8",
					// 300:"#B8A89E",
					// 400:"#A48D83",
					// 500:"#7D5856",
					// 600:"#6D3A3C",
					// 700:"#581114",
					// 800:"#47070A",
					// 900:"#330406",
				},
				'secondary':"#D43B18",
				'neutral': {
					50: '#F9FAF9',
					100: '#F4F5F4',
					200: '#E5E6E5',
					300: '#D3D4D4',
					400: '#A0A1A1',
					500: '#727373',
					600: '#515252',
					700: '#3F4040',
					800: '#232424',
					900: '#161717',
					950: '#0A0A0A',
				  },
			},
			dropShadow:{
				"primary-l": "0 35px 35px var(--primary-20,#D43B18)",
				"primary-m": "0 35px 35px var(--primary-80,#D43B18)",
				"primary-d": "0 35px 35px var(--primary,#D43B18)",
				"primary-hard": "-12px 24px 0px var(--primary,#D43B18)",
				"primary-hard-xl": "-12px 24px 0px var(--primary,#D43B18)",
				"primary-hard-lg": "-10px 20px 0px var(--primary,#D43B18)",
				"primary-hard-sm": "-6px 12px 0px var(--primary,#D43B18)",
				
			},
			boxShadow: {
				'active': '0px 0px 16px rgba(252, 212, 127, 0.6)',
			  },
			keyframes: {
				"fly-in": {
							"0%": {
								opacity: "0",
								transform: "scale3d(0.3, 0.3, 0.3)",
								transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
							},
							"20%": {
								transform: "scale3d(1.1, 1.1, 1.1)"
							},
							"40%": {
								transform: "scale3d(0.9, 0.9, 0.9)"
							},
							"60%": {
								opacity: "1",
								transform: "scale3d(1.03, 1.03, 1.03)"
							},
							"80%": {
								transform: "scale3d(0.97, 0.97, 0.97)"
							},
							"100%": {
								opacity: "1",
								transform: "scale3d(1, 1, 1)"
							},
						},
			}
		}
	},
	plugins: [
		// require('tailwindcss-3d'),
		require('@tailwindcss/forms'),
		// ...
	  ]
};
