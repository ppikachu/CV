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
					base: 'text-3xl sm:text-4xl font-normal uppercase tracking-tight text-primary mb-0'
				}
			},
			h2: {
				slots: {
					base: 'text-lg uppercase text-primary font-semibold mb-2 mt-0'
				}
			},
			h3: {
				slots: {
					base: 'text-base uppercase font-bold text-primary mt-0 mb-0'
				}
			},
			h4: {
				slots: {
					base: 'text-xs uppercase font-semibold text-primary mt-0 mb-0'
				}
			}
		},
		blogPost: {
			defaultVariants: {
				variant: 'outline'
			},
			slots: {
				root: 'relative group/blog-post transition-all duration-200 hover:ring-primary',
				header: 'relative pointer-events-none shrink-0 self-stretch w-28 sm:w-36 overflow-hidden',
				image: 'size-full object-cover object-center',
				title: 'text-primary uppercase font-normal text-base',
				description: 'text-xs'
			},
			variants: {
				orientation: {
					horizontal: {
						root: 'flex flex-row items-stretch lg:flex lg:flex-row lg:grid-cols-none gap-3.5 sm:gap-4 p-0 sm:p-0',
						body: 'min-w-0 flex-1 p-3.5 sm:p-4 lg:px-4 justify-center'
					}
				}
			}
		}
	},
});
