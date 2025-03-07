const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.authorize = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access denied! Admin rights required",
    });
  }

  next();
};
