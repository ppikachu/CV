<template>
	<div class="flex flex-col relative">
		<!-- Main Content (scrolls over the sticky bottom contact section) -->
		<div class="relative z-10 bg-default space-y-4 pb-12">
			<Header />
			<Projects />
			<Skills />
			<Timeline />
			<MoreWork />
			<Personal />
			<Faqs />
		</div>

		<!-- Sticky Bottom Reveal: appears under content as you scroll to the bottom -->
		<StarsBackground class="sticky bottom-0 z-0 py-8 flex flex-col items-center justify-center">
			<div class="z-10 flex min-h-dvh flex-col items-center justify-end">
				<Contact />
				<SiteFooter />
			</div>
		</StarsBackground>

		<!-- Anchor target for #contact: placed in static flow at the bottom so browser scrolls all the way down to reveal the contact section -->
		<div id="contact" class="h-px -mt-px pointer-events-none" aria-hidden="true" />

	</div>
</template>