export default defineAppConfig({
	ui: {
		primary: "lime",
		gray: "slate",
		icons: {
			dark: 'i-ph-moon',
			light: 'i-ph-sun'
		},
		prose: {
			h1: {
				slots: {
					base: 'text-3xl sm:text-5xl font-extrabold font-heading uppercase tracking-tight leading-none text-primary mt-12 mb-0'
				}
			},
			h2: {
				slots: {
					base: 'text-xl uppercase font-heading text-primary leading-tight font-extrabold mb-2'
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
				root: 'mt-24 mb-6',
				title: 'uppercase font-heading text-primary text-2xl md:text-3xl font-bold',
				description: 'text-sm'
			}
		},
		blogPost: {
			slots: {
				root: 'relative group/blog-post transition-all duration-200 hover:ring-primary-800',
				badge: 'p-0 text-muted',
				title: 'text-primary uppercase font-bold text-base leading-none',
				description: 'text-sm'
			},
			variants: {
				orientation: {
					vertical: {
						body: 'p-3 sm:p-4'
					},
					horizontal: {
						root: 'gap-0 flex-row lg:flex lg:flex-row',
						header: 'w-2/5 sm:w-1/4 overflow-hidden',
						body: 'sm:p-4 lg:p-4'
					}
				},
				variant: {
					outline: {
						description: 'text-toned'
					}
				}
			}
		}
	},
});
