export const errorHandler=(err, req, res, next)=>{
    const statusCode = res.status === 200 ? 500 : 400;

    return res.status(statusCode).json({
        success:false,
        error: err.message,
    });
};