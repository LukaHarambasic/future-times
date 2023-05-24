export default function handler(request, response) {
  console.log('request', request)
  const { name = 'World' } = request.query
  return response.send(`Hello ${name}!`)
}
