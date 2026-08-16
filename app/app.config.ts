export default defineAppConfig({
	ui: {
		primary: "lime",
		gray: "slate",
		icons: {
			dark: 'i-lucide-moon',
			light: 'i-lucide-sun'
		},
		prose: {
			h1: {
				slots: {
					base: 'text-2xl sm:text-4xl font-extrabold font-heading uppercase tracking-tight leading-none text-primary mb-0'
				}
			},
			h2: {
				slots: {
					base: 'text-xl uppercase font-heading text-primary font-extrabold mb-2 mt-0'
				}
			},
			h3: {
				slots: {
					base: 'text-2xl uppercase font-heading font-bold text-primary mt-0 mb-0'
				}
			},
			h4: {
				slots: {
					base: 'text-xl uppercase font-heading font-semibold text-primary mt-0 mb-0'
				}
			},
			h5: {
				slots: {
					base: 'text-lg uppercase font-heading font-semibold text-primary mt-0 mb-0'
				}
			},
			h6: {
				slots: {
					base: 'text-md uppercase font-heading font-semibold text-primary mt-0 mb-0'
				}
			}
		},
		pageFeature: {
			slots: {
				root: 'mt-16 mb-6',
				title: 'uppercase font-heading text-primary text-2xl font-bold',
				description: 'text-sm'
			}
		},
		blogPost: {
			defaultVariants: {
				variant: 'outline'
			},
			slots: {
				root: 'relative group/blog-post transition-all duration-200 hover:ring-primary-800',
				header: 'relative w-full aspect-video overflow-hidden',
				image: 'size-full object-cover',
				title: 'text-primary uppercase font-bold text-base',
				description: 'text-sm'
			},
			variants: {
				orientation: {
					horizontal: {
						root: 'flex-row gap-3.5 sm:gap-4',
						header: 'w-28 sm:w-36 overflow-hidden',
					}
				}
			}
		}
	},
});
