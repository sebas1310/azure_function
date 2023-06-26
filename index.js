const mysql = require('mysql2')
const fs = require('fs')
const path = require('path');
const rutaCertificado = path.resolve(__dirname,"nombrearchivo");
const cart = fs.readFileSync(rutaCertificado,"utf8");

const pool = mysql.createPool({
    user : 'stuardo',
    password : '7gPhbXikb9tA35M',
    database: 'hr',
    host: 'clase14gtics.mysql.database.azure.com',
    port : 3306,
    ssl: {
        rejectUnauthorized : true,
        ca:[cart]
    }
})

const promisePool =pool.promise();

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let nombre = context.bindingData.nombre;
    let apellido =context.bindingData.apellido;

    //api key
    let apikey = req.headers["api-key"];
    context.log("Api key reibido" + apikey);



    let sql = 'select * from hr.employees';

//para obtneer nombre

    let nombreEmployee = req.query.nombre;
    if(nombre != undefined){;
        sql  = "select * from employees where first_name=?";
        const [rows,fileds] = await promisePool.query(sql,[nombreEmployee]);
        context.res = {
            body:{
                result:'ok',
                data:rows
            },
            headers:{'Contnent-Type':'application/json'}
        }
    }
    else{
        sql = "select * from hr.employee";
        const [rows,fileds] = await promisePool.query(sql);
        context.res = {
            body:{
                result:'ok',
                data:rows
            },
            headers:{'Contnent-Type':'application/json'}
        }
    }
}