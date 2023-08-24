const { JWT_SECRET = "dev-key", NODE_ENV } = process.env;
module.exports = { JWT_SECRET, NODE_ENV };
