import pg from 'pg'
const pool = new pg.Pool({
   host: 'ec2-63-32-30-191.eu-west-1.compute.amazonaws.com',
   database: 'd95lnnf680vj64',
   user: 'vyxnksmpyygyno',
   port: 5432,
   password: '3d9896c1d14bb6ab0042625a479a769a148c4e8c448d839cc5c5ee6c14723fa4',
   ssl: {rejectUnauthorized: false}
})
export default function query(text, params){
return pool.query(text, params)
}




