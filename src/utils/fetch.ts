export default (url: string) => {
  try {
    if (url) return fetch(url).then(response => response.json())
  } catch (error) {
    console.error(error)
  }
}