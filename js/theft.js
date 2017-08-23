const fs = require('fs');
let output=[],write=[];
let work= fs.createWriteStream('../json/theft.json')
let rl = require('readline').createInterface({
    input: require('fs').createReadStream('../crimedata.csv')});

rl.on('line', (line) => {
    let jsonForm = {};
    let array = line.split(',');
    jsonForm.primaryType = array[5];
    jsonForm.description = array[6];
    jsonForm.year = array[17];

    if (jsonForm.primaryType == 'THEFT') {
        if (jsonForm.description == 'OVER $500' || jsonForm.description == '$500 AND UNDER') {
            write.push(jsonForm); }}});
 
 rl.on('close', (line) => {
    let ov=write.reduce((count, ele) => {
        if(ele.description == 'OVER $500') {
            for(i=0; i<16;i++){
                if(ele.year== 2001 + i) count[i]++;} } return count; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    let un=write.reduce((count1, ele) => {
        if(ele.description ==  '$500 AND UNDER') {
            for(i=0; i<16;i++){
                if(ele.year== 2001 + i) count1[i]++;} } return count1;  }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])      

    for (let i = 0; i <= 15; i++) {
         let theft= { year : 2001 +i,
            "OVER$500" : ov[i],
            "$500_AND_UNDER" : un[i]}
            output.push(theft)}
            work.write(JSON.stringify(output, null, 2));
        });