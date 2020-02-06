const pg = require('pg');

var config = {
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
  host: process.env.host
};

var pool = new pg.Pool(config);

module.exports = async (req, res, next) => {
  try {
    const { id, mail } = req.query;

    const result = await pool.query(`
      UPDATE trees
      SET adopted = $2
      WHERE id = $1;
    `, [id, mail]);
    res.json({
        "result": 'tree adopted '
    });
  } catch (error) {
    console.error(error);
    res.json({
        "error": error
    });
  }
}