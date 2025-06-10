const jwt = require('jsonwebtoken');
const JWT_SECRET = 'a25274786a26a92b87234fdf81894e16b36685f6f1f29d1d9bd6f768147208af';

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
}
module.exports = fetchuser;