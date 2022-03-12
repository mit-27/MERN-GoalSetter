// Here we override the default error handler middleware
const errorHandler = (err, req, res, next) => {

    // if statuscode set then we use that otherwise 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

module.exports = { errorHandler }