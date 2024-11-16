const catchError= (callback)=> {
    return (req, res, next) => {
      callback(req, res, next).catch((error) => {
        return res.json({message :"catch error",error : error.message});
      });
    };
  }
  export default catchError;
  
  
  