const Client = require('node-rest-client').Client;

const client = new Client();



module.exports.createContact = (data, cb) => {
    let apiUrl = 'http://localhost:3002/contact';

    let args = {
        headers: {
            "Content-Type":"application/json"
        },
        data: data
    }

    client.post(apiUrl, args, function(data, res) {
        if(res.statusCode == 201) {
            cb(null, data.data)
        }else {
            cb(data,null)
        }
    })


}