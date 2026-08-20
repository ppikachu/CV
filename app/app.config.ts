export default defineAppConfig({
	ui: {
		primary: "lime",
		gray: "slate",
		icons: {
			dark: 'i-ph-moon',
			light: 'i-ph-sun'
		},
		badge: {
			slots: {
				label: 'text-wrap'
			}
		},
		prose: {
			h1: {
				slots: {
					base: 'text-3xl sm:text-5xl font-extrabold font-heading tracking-tighter leading-none text-primary mt-12 mb-0'
				}
			},
			h2: {
				slots: {
					base: 'text-xl font-heading text-primary leading-tight font-extrabold mb-2'
				}
			},
			h3: {
				slots: {
					base: 'text-2xl font-heading font-bold text-primary mt-0 mb-0'
				}
			},
			h4: {
				slots: {
					base: 'text-xl font-heading font-semibold text-primary mt-0 mb-0'
				}
			},
			h5: {
				slots: {
					base: 'text-lg font-heading font-semibold text-primary mt-0 mb-0'
				}
			},
			h6: {
				slots: {
					base: 'text-md font-heading font-semibold text-primary mt-0 mb-0'
				}
			}
		},
		pageFeature: {
			slots: {
				root: 'mt-24',
				wrapper: 'space-y-2 mb-6',
				title: 'font-heading font-extrabold tracking-tight text-primary text-3xl md:text-4xl leading-7',
				description: 'text-sm'
			}
		},
		blogPost: {
			slots: {
				root: 'gap-0 relative group/blog-post transition-all duration-200 hover:ring-1 hover:ring-primary h-full',
				image: 'object-cover object-center w-full h-full',
				meta: 'mb-0',
				badge: 'p-0 text-primary/70 ring-0 leading-tight',
				title: 'text-primary font-extrabold leading-none text-pretty',
				body: 'flex-1 flex flex-col gap-1.5',
				description: 'text-sm mt-0',
			},
			variants: {
				orientation: {
					vertical: {
						root: 'flex flex-col h-full',
						body: 'p-2 sm:p-4 flex-1 flex flex-col gap-2',
						footer: 'relative z-10 flex items-center justify-between gap-2 p-2 sm:p-4'
					},
					horizontal: {
						root: 'gap-0 flex-row lg:flex lg:flex-row h-full',
						header: 'w-2/5 sm:w-2/5 overflow-hidden aspect-video-card shrink-0',
						body: 'p-0 py-4 md:py-4 sm:p-3 px-4 lg:px-4',
						description: 'text-xs'
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
