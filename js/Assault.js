const fs = require('fs');
let output=[],write=[];
let work= fs.createWriteStream('../json/assault.json') 
let rl = require('readline').createInterface({
    input: require('fs').createReadStream('../crimedata.csv')});//reading csv file line by line

rl.on('line', (line) => {
    let jsonForm = {};
    let lineSplit = line.split(',');//splitting data column by column
    jsonForm.Arrest=lineSplit[8];
        jsonForm.Primary=lineSplit[5];
        jsonForm.year=lineSplit[17];

    if (jsonForm.Primary=="ASSAULT") {
        if((jsonForm.Arrest=="false")||(jsonForm.Arrest=="true")){
            write.push(jsonForm); }}});//pushing required data into jsonform
 
 rl.on('close', (line) => {
    let ov=write.reduce((count, ele) => {
        if(ele.Arrest=="false") {
            for(i=0; i<16;i++){
                if(ele.year== 2001 + i) count[i]++;} } return count; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    let un=write.reduce((count1, ele) => {
        if(ele.Arrest=="true") {
            for(i=0; i<16;i++){
                if(ele.year== 2001 + i) count1[i]++;} } return count1;  }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])      

    for (let i = 0; i <= 15; i++) {
         let theft= { year : 2001 +i,
            "False" : ov[i],
            "True" : un[i]}
            output.push(theft)}
            work.write(JSON.stringify(output, null, 2));});//writing filterd data into json