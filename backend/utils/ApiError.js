class ApiError extends Error{
    constructor(
        messege = "something went wrong",
        statusCode,
        error = [],
        stack
    ){
      super(messege)
      this.statusCode = statusCode
      this.error = error
      this.stack = stack
      this.success = false
    }
}

export default ApiError