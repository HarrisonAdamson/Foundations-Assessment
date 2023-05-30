require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');
// import keyboardArray from '../Data.js';


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

  module.exports = {
    seed: (req, res) => {
    sequelize.query(`
            drop table if exists ratings;

            CREATE TABLE ratings (
                ratings_id serial PRIMARY KEY,
                rating integer,
                name varchar
              );              

        `).then(() => {
        console.log('DB seeded!');
        res.sendStatus(200);
    }).catch(err => console.log('error seeding DB', err));
},

createRating: (req, res) => {
    const {name, rating} = req.body;
    sequelize.query('INSERT INTO ratings (name, rating) VALUES(:name, :rating)', {
    replacements: { name, rating }})
        .then(() => {
            res.sendStatus(200);
        });
        console.log(req.body);
},

getRating: (req, res) => {
    sequelize.query(`SELECT ratings_id, rating, name
    FROM ratings`)
    .then(dbRes => { res.status(200).send(dbRes[0]); })
    .catch(err => console.log(err))
},

deleteRating: (req, res) => {
    const {id} = req.params;
    sequelize.query(`DELETE FROM ratings WHERE ratings_id = ${id}`)
    .then(dbRes => {res.status(200).send(dbRes[0])})
    .catch(err => console.log(err))
},


}