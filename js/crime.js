const fs = require('fs');
const readline= require('readline');
let array=[];
let year2015a=[];
let year2015b=[];
let year2015c=[];
let year2015d=[];
let input = readline.createInterface({
	input: fs.createReadStream('../crimedata.csv','UTF-8')});
input.on('line', (line) => {
		let jsonarray={};
        let lineSplit=line.split(',');
        jsonarray.Fbi=lineSplit[14];
        jsonarray.year=lineSplit[17];
if(jsonarray.year=="2015"){       
   if((jsonarray.Fbi=="01A")||(jsonarray.Fbi=="02")||(jsonarray.Fbi=="03")||(jsonarray.Fbi=="04A")||(jsonarray.Fbi=="04B")||(jsonarray.Fbi=="05")||(jsonarray.Fbi=="06")||(jsonarray.Fbi=="07")||(jsonarray.Fbi=="09")){
				year2015a.push(jsonarray);
            }
    if((jsonarray.Fbi=="01B")||(jsonarray.Fbi=="08A")||(jsonarray.Fbi=="08B")||(jsonarray.Fbi=="10")||(jsonarray.Fbi=="11")||(jsonarray.Fbi=="12")||(jsonarray.Fbi=="13")||(jsonarray.Fbi=="14")||(jsonarray.Fbi=="15")||(jsonarray.Fbi=="16")||(jsonarray.Fbi=="17")||(jsonarray.Fbi=="18")||(jsonarray.Fbi=="19")||(jsonarray.Fbi=="20")||(jsonarray.Fbi=="22")||(jsonarray.Fbi=="24")||(jsonarray.Fbi=="26")){
            year2015b.push(jsonarray);
            }
    if((jsonarray.Fbi=="01A")||(jsonarray.Fbi=="02")||(jsonarray.Fbi=="03")||(jsonarray.Fbi=="04A")||(jsonarray.Fbi=="04B")){
            year2015c.push(jsonarray);
            }
    if((jsonarray.Fbi=="05")||(jsonarray.Fbi=="06")||(jsonarray.Fbi=="07")||(jsonarray.Fbi=="09")){
            year2015d.push(jsonarray);
            }}});  
input.on('close',(line)=> {
  let Index=year2015a.reduce((c,ele)=>{c++;
    return c;
   },0)
  let NonIndex=year2015b.reduce((c,ele)=>{c++;
         return c;
   },0)
  let Violent=year2015c.reduce((c,ele)=>{ c++;
         return c;},0)
  let Property=year2015d.reduce((c,ele)=>{ c++;
         return c; },0)
    array.push({CrimeType:"Indexcrime",Total:Index});
    array.push({CrimeType:"Nonindexcrime",Total:NonIndex});
    array.push({CrimeType:"Violentcrime",Total:Violent});
    array.push({CrimeType:"Propertycrime",Total:Property});
let json=JSON.stringify(array,null,2);
fs.writeFileSync('../json/criminal1.json',json);   
    console.log(array);});        