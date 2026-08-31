export default defineAppConfig({
	ui: {
		colors: {
			primary: "lime",
			secondary: "pink",
			neutral: "mist"
		},
		icons: {
			menu: 'i-pixelarticons-menu',
			close: 'i-pixelarticons-close',
			loading: 'i-pixelarticons-loader',
			external: 'i-pixelarticons-external-link',
			chevronDown: 'i-pixelarticons-chevron-down',
			chevronLeft: 'i-pixelarticons-chevron-left',
			chevronRight: 'i-pixelarticons-chevron-right',
			arrowLeft: 'i-pixelarticons-arrow-left',
			arrowRight: 'i-pixelarticons-arrow-right',
			search: 'i-pixelarticons-search'
		},
		badge: {
			slots: {
				label: 'text-wrap rounded-full overflow-visible',
				leadingIcon: 'size-6 shrink-0',
				trailingIcon: 'size-6 shrink-0'
			}
		},
		prose: {
			h1: {
				slots: {
					base: 'text-5xl sm:text-5xl font-extrabold font-heading tracking-tighter leading-tight text-primary mt-12 mb-0'
				}
			},
			h2: {
				slots: {
					base: 'text-xl font-heading text-primary leading-none font-extrabold mb-2'
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
			},
			li: {
				base: 'my-4 leading-6 marker:text-primary'
			}
		},
		pageFeature: {
			slots: {
				root: 'mt-24',
				wrapper: 'space-y-4 mb-6',
				title: 'font-heading font-extrabold tracking-tight text-primary text-3xl md:text-4xl leading-7',
				description: 'text-sm text-default'
			}
		},
		blogPost: {
			slots: {
				root: 'gap-0 relative group/blog-post transition-all duration-200 ring-1 ring-transparent! hover:ring-primary! h-full',
				image: 'object-cover object-center w-full h-full',
				meta: 'mb-0',
				badge: 'p-0 text-primary/70 bg-transparent ring-0 leading-tight',
				title: 'text-primary font-heading tracking-tighter leading-none text-pretty',
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
						header: 'w-2/5 sm:w-2/5',
						body: 'p-0 py-4 md:py-4 sm:p-3 px-4 lg:px-4',
						description: 'text-xs'
					}
				}
			},
			compoundVariants: [
				{
					variant: 'outline',
					to: true,
					class: {
						root: 'hover:bg-transparent'
					}
				}
			]
		},
		button: {
			slots: {
				base: 'rounded-full',
				leadingIcon: 'size-6 shrink-0',
				trailingIcon: 'size-6 shrink-0'
			},
			defaultVariants: {
				variant: 'outline'
			}
		}
	},
});
