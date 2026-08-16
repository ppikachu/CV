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
		<div class="sticky bottom-0 z-0 py-8 flex flex-col items-center justify-center">
			<Contact />
			<SiteFooter />
		</div>
	</div>
</template>