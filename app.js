const { error } = require('console')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

let valeData = {};
let carData = {};
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
fs.readFile('vale.json', 'utf8', (err, data) => {
    if (err) {
      console.error('JSON dosyası okunamadı:', err);
      return;
    }else{
        valeData = JSON.parse(data);
        console.log('veriler islendi : ', valeData)
    }
});

fs.readFile('justCar.json', 'utf8', (err, data) => {
  if (err) {
    console.error('JSON dosyası okunamadı:', err);
    return;
  }else{
      carData = JSON.parse(data);
      console.log('veriler islendi : ', carData)
  }
});


app.post('/', (request, responce) => {
    const newVale = request.body;
  
    fs.readFile('vale.json', 'utf8', (err, data) => {
      if (err) {
        console.error('JSON dosyası okunamadı:', err);
        responce.status(500).json({ error: 'JSON dosyası okunamadı' });
        return;
      }
  
      const jsonData = JSON.parse(data);
      jsonData.valeler.push(newVale);
  
      fs.writeFile('vale.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error('Veri yazma hatası:', err);
          responce.status(500).json({ error: 'Veri yazma hatası' });
        } else {
          console.log('Veri başarıyla yazıldı:', newVale);
          responce.json({ message: 'Veri başarıyla kaydedildi' });
        }
      });
    });
  });
//arac ekleme alanı 
  app.post('/cars', (request, responce) => {
    const newCar = request.body;
   
  
    fs.readFile('justCar.json', 'utf8', (err, data) => {
      if (err) {
        console.error('JSON dosyası okunamadı:', err);
        responce.status(500).json({ error: 'JSON dosyası okunamadı' });
        return;
      }
  
      const jsonData = JSON.parse(data);
      jsonData.cars.push(newCar);
  
      fs.writeFile('justCar.json', JSON.stringify(jsonData), (err) => {
        
        if (err) {
          console.error('Veri yazma hatası:', err);
          responce.status(500).json({ error: 'Veri yazma hatası' });
        } else {
          console.log('Veri başarıyla yazıldı:', newCar);
          responce.json({ message: 'Veri başarıyla kaydedildi' });
        }
      });
    });
  });



app.get('/',function(request,responce){
    responce.send(valeData)
    console.log('yazildi')
})

app.get('/cars',function(request,responce){
  responce.send(carData)
  console.log('yazildi')
})


  

var serevr = app.listen(3030)




