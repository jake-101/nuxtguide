module.exports = async function (req, res, next) {
  console.log(req.path)

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
  next()
}