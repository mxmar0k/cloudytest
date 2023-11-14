export const errorHandler=(err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return res.statusCode(statusCode).json({
        success:false,
        error: err.message,
    });
};