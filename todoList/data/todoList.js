const fs = require('fs');
function addItem(item){
    let data = item;
    fs.appendFile('./db/thelist.txt', data, (err) => {
        if(err){
            console.log(err);
        }
        console.log(data);
    });
}