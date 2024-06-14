export default function () {
  if (useI18n().locale.value.length>2)
    return useI18n().locale.value.split('-')[0]
  else
    return useI18n().locale.value
}