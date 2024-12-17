class ApiResponse{
    constructor(statusCode,messege="success",data){
       this.statusCode = statusCode
       this.message = messege
       this.data = data
       this.success = statusCode<400
    }
}

export default ApiResponse;