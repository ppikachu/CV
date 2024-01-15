<template>
	<section class="not-prose mb-10">
		<UButton
			icon="i-heroicons-globe-americas-16-solid"
			label="CABA, Buenos Aires, Argentina"
			variant="link" color="gray"
			size="xs"
			:padded="false"
		/>
		<ul class="flex gap-4">
			<li>
				<UButton
					to="#"
					target="_blank"
					icon="i-heroicons-envelope"
					variant="link"
					color="gray"
					:padded="false"
					:ui="{
						icon: {
							size: {
								xl: 'w-8 h-8',
							}
						}
					}"
				/>
			</li>
			<li>
				<UButton
					to="#"
					target="_blank"
					icon="i-heroicons-user-circle"
					variant="link"
					color="gray"
					:padded="false"
					:ui="{
						icon: {
							size: {
								xl: 'w-8 h-8',
							}
						}
					}"
				/>
			</li>
		</ul>
	</section>
</template>