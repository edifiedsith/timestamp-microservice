var express=require('express')
var app=express()
var months=['January','February','March','April','May','June','July','August','September','October','November','December']

app.get('/', function (req, res) {
    
    res.send("Timestamp Microservice: Append Unix timestamp or natural language date to URL.")
})

app.get('/:DATE', function (req, res) {
    var q=req.params.DATE
    if(!isNaN(Number.parseInt(q)))
        q=Number.parseInt(q)*1000
    if(isNaN(Date.parse(new Date(q))))
        res.send({'unix':null, 'natural':null})
    else{
        var date=new Date(q)
        res.send({'unix': date.getTime()/1000, 'natural': toNatural(date)})
    }    
})

function toNatural(d){
    var str=months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()
    return str;
}

app.listen(8080, function () {
  console.log('Listening on port 8080.')
})