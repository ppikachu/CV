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
					base: 'text-3xl sm:text-5xl font-extrabold font-heading uppercase tracking-tighter leading-none text-primary mt-12 mb-0'
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
				root: 'gap-0 relative group/blog-post transition-all duration-200 hover:ring-primary-800 h-full',
				image: 'object-cover object-center w-full h-full',
				meta: 'mb-0',
				badge: 'p-0 text-primary/70 ring-0',
				title: 'text-primary uppercase font-heading font-extrabold text-lg leading-none',
				body: 'flex-1 flex flex-col gap-1',
				description: 'text-sm text-wrap',
				footer: 'mt-auto'
			},
			variants: {
				orientation: {
					vertical: {
						root: 'flex flex-col h-full',
						body: 'sm:p-2 md:p-4 p-2 flex-1 flex flex-col'
					},
					horizontal: {
						root: 'gap-0 flex-row lg:flex lg:flex-row h-full',
						header: 'w-2/5 sm:w-2/5 overflow-hidden aspect-video-card shrink-0',
						body: 'p-0 py-2 lg:py-4 sm:p-3 px-4 lg:px-4',
						description: 'text-xs'
					}
				},
				variant: {
					outline: {
						description: 'text-default'
					}
				},
				to: {
					true: {
						image: ''
					}
				}
			}
		}
	},
});
