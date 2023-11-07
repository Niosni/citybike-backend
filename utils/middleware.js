const errorHandler = (error, req, res, next) => {
  if (error.message.includes('invalid input syntax')) {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.message.includes('couldn\'t be found')) {
    return res.status(404).json({ error: error.message })
  } else if (error.message.includes('connection timeout')){
    res.status(500).end()
  }

  next(error)
}

module.exports = {
  errorHandler
}