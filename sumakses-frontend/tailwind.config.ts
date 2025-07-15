import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  				colors: {
			// SUMAKSES Design System Colors
			background: {
				DEFAULT: '#FFFFFF', // Default background color
				app: '#F7F8FA',
				surface: '#FFFFFF',
				surfaceAlt: '#F1F5F9',
				card1: '#E0E7FF',
				card2: '#FDE68A',
				card3: '#FECACA',
				card4: '#BBF7D0'
			},
  			brand: {
  				primary: '#6366F1',
  				primaryDark: '#4F46E5',
  				primaryLight: '#A5B4FC',
  				secondary: '#F59E42',
  				secondaryLight: '#FDE68A',
  				accent: '#F472B6',
  				accentLight: '#FCE7F3'
  			},
  						text: {
				primary: '#18181B',
				secondary: '#6B7280',
				tertiary: '#A1A1AA',
				onPrimary: '#FFFFFF',
				onSecondary: '#18181B'
			},
						foreground: '#18181B', // Default foreground color for compatibility
			muted: {
				DEFAULT: '#F1F5F9', // Default muted color for compatibility
				foreground: '#6B7280' // Default muted foreground color for compatibility
			},
			accent: {
				DEFAULT: '#F472B6', // Default accent color for compatibility
				foreground: '#FFFFFF' // Default accent foreground color for compatibility
			},
			border: {
				DEFAULT: '#E5E7EB', // Default border color for compatibility
				default: '#E5E7EB',
				focus: '#6366F1',
				active: '#6366F1'
			},
			input: '#E5E7EB', // Default input border color for compatibility
			ring: '#6366F1', // Default ring color for compatibility
  			states: {
  				success: '#22C55E',
  				warning: '#FACC15',
  				error: '#EF4444',
  				info: '#3B82F6',
  				muted: '#F1F5F9'
  			},
  			// Legacy support
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#6366F1', // SUMAKSES Primary
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#F59E42', // SUMAKSES Secondary
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: '#F472B6', // SUMAKSES Accent
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// SUMAKSES specific colors for backward compatibility
  			sumakses: {
  				blue: '#6366F1',
  				green: '#F59E42',
  				orange: '#F472B6',
  				'blue-light': '#A5B4FC',
  				'green-light': '#FDE68A',
  				'orange-light': '#FCE7F3',
  				'blue-dark': '#4F46E5',
  				'green-dark': '#F59E42',
  				'orange-dark': '#F472B6'
  			}
  		},
  		spacing: {
  			// SUMAKSES spacing system - 4px base unit
  			'xxs': '2px',
  			'xs': '4px',
  			'sm': '8px',
  			'md': '16px',
  			'lg': '24px',
  			'xl': '32px',
  			'2xl': '40px',
  			'3xl': '56px'
  		},
  		borderRadius: {
  			// SUMAKSES radius system
  			'xs': '6px',
  			'sm': '10px',
  			'md': '16px',
  			'lg': '24px',
  			'xl': '32px',
  			'full': '9999px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			// SUMAKSES shadow system
  			'xs': '0 1px 2px rgba(16,30,54,0.04)',
  			'sm': '0 2px 8px rgba(16,30,54,0.06)',
  			'md': '0 4px 16px rgba(16,30,54,0.08)',
  			'lg': '0 8px 32px rgba(16,30,54,0.12)',
  			'focus': '0 0 0 2px #6366F133'
  		},
  		fontSize: {
  			// SUMAKSES typography scale
  			'display': ['34px', { lineHeight: '1.15', letterSpacing: '-0.5px', fontWeight: '700' }],
  			'h1': ['28px', { lineHeight: '1.2', letterSpacing: '-0.2px', fontWeight: '700' }],
  			'h2': ['24px', { lineHeight: '1.2', letterSpacing: '-0.1px', fontWeight: '700' }],
  			'h3': ['20px', { lineHeight: '1.2', letterSpacing: '0px', fontWeight: '600' }],
  			'h4': ['18px', { lineHeight: '1.2', letterSpacing: '0px', fontWeight: '600' }],
  			'body': ['16px', { lineHeight: '1.5', letterSpacing: '0px', fontWeight: '400' }],
  			'body-bold': ['16px', { lineHeight: '1.5', letterSpacing: '0px', fontWeight: '600' }],
  			'caption': ['13px', { lineHeight: '1.4', letterSpacing: '0px', fontWeight: '400' }],
  			'caption-bold': ['13px', { lineHeight: '1.4', letterSpacing: '0px', fontWeight: '600' }],
  			'button': ['16px', { lineHeight: '1.2', letterSpacing: '0.1px', fontWeight: '600' }],
  			'tab': ['12px', { lineHeight: '1.2', letterSpacing: '0.1px', fontWeight: '600' }]
  		},
  		fontWeight: {
  			'regular': '400',
  			'medium': '500',
  			'semibold': '600',
  			'bold': '700'
  		},
  		animation: {
  			// SUMAKSES motion system
  			'fade-in': 'fadeIn 180ms cubic-bezier(.4,0,.2,1)',
  			'slide-in': 'slideIn 180ms cubic-bezier(.4,0,.2,1)',
  			'scale-in': 'scaleIn 180ms cubic-bezier(.4,0,.2,1)',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			'slide-in': {
  				'0%': { transform: 'translateY(10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			'scale-in': {
  				'0%': { transform: 'scale(0.95)', opacity: '0' },
  				'100%': { transform: 'scale(1)', opacity: '1' }
  			},
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		zIndex: {
  			'base': '0',
  			'dropdown': '10',
  			'sticky': '20',
  			'fixed': '30',
  			'modal': '40',
  			'toast': '50'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
