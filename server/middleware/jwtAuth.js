import jwt from "jsonwebtoken";


export const jwtAuth = async (req, res, next) => {

  try {
    const Token =  req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!Token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized: No token provided",
      });
    }

    jwt.verify(Token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "Forbidden: Invalid token",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("JWT Middleware Error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Authentication Error...🔐",
    });
  }
};