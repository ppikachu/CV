export default defineEventHandler(async (event) => {
  const all = await queryCollection(event, 'content').where('path', 'LIKE', '/es/proyecto/%').first()
  return all
})
