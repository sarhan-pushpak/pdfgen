
const db = require('../database/connection')
const axios =  require("axios") 

//  ======[ Axios Call For Python ]========
async function doPostRequest(data) {
    
    let payload = data;
    console.log(data);
    axios.post('http://localhost:8000/pdf', payload)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

//  ======[ GET Request ]========

const read = (req, res) => {
    var query = 'select * from logs';
    db  .query(query, (err, results) => {
        if(!err){
            const fileLoc = doPostRequest(results);
            console.log(fileLoc);
            return res.status(200).send({ message: 'Vehicle List', data: fileLoc });
        }else{
            return res.status(500).send({ message: 'failed', error: err.message })
        }
    })
}   

//  ======[ POST Request ]========

const add = (req, res) => {
    let { 
        Id,
        VehicleNumber,
        EntryGate,
        ExitGate } = req.body
    //query- insert data in table
    var query = "insert into logs(Id,VehicleNumber,EntryGate,ExitGate)values(?,?,?,?)";
    //pass query parameters
    db.query(query, [Id,VehicleNumber, EntryGate, ExitGate], (err, results) => {

        if (!err) {
            //if not error send response massage
            return res.status(201).send({ message: 'new vehical added successfully' })
        } else {
            return res.status(500).send({ message: 'failed', error: err.message })
        }
    });
    
}

module.exports.add = add
module.exports.read = read











// =================  POST request  ======================

// const add = async (req, res) => {

    //     try {
        //         const body = req.body
        //         const data = await db.query(`
        //         INSERT INTO employee (
            //             Id,
//             VehicleNumber,
//             EntryGate,
//             ExitGate
//         ) VALUES (
    //             '${body.Id}',
    //             '${body.VehicleNumber}',
    //             '${body.EntryGate}',
    //             '${body.ExitGate}'
    //         );`);
    
    //         return res.status(200).send({ message: 'Log data added' });
    
    //     } catch (error) {
        //         return res.send(error.message)
        //     }
        // }

// =================  GET request  ======================

// const read = async (req, res) => {

//     try {

//         const data = await db.query(`SELECT * FROM logs`);

//         return res.status(200).send({ message: 'logs', data: data });

//     } catch (error) {
//         return res.send(error.message)
//     }
// }