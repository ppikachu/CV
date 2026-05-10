export default function () {
	const { locale } = useI18n()
	if (locale.value.length > 2)
		return locale.value.split('-')[0]
	else
		return locale.value
}