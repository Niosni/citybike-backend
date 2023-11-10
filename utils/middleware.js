const errorHandler = (error, req, res, next) => {
  if (error.message.includes('invalid input syntax')) {
    return res.status(400).json({ error: 'Malformatted id.' })
  } else if (error.message.includes('couldn\'t be found')) {
    return res.status(404).json({ error: error.message })
  } else if (error.message.includes('connection timeout')){
    return res.status(500).end()
  } else if (error.name === 'AggregateError') {
    return res.status(500).json({ error: 'Problem connection to database. Please verify that the database is online.' })
  }

  next(error)
}

module.exports = {
  errorHandler
}