module.exports = async (req, res) => {
  const { default: handler } = await import('../netal-portfolio/api/dino.js')
  return handler(req, res)
}
