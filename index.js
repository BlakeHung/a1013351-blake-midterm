const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser');

const firebase = require('firebase');


 var config = {
    apiKey: "AIzaSyBiNS74BxJ08l4NQuceawFfdQu5GHC1ERg",
    authDomain: "blake-midterm.firebaseapp.com",
    databaseURL: "https://blake-midterm.firebaseio.com",
    projectId: "blake-midterm",
    storageBucket: "blake-midterm.appspot.com",
    messagingSenderId: "621500111784"
  };
  firebase.initializeApp(config);
  // 初始化

	var userName = firebase.database().ref('name');



// use 使用一個功能


express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/getName', (req, res) => {
  	var data = {
  	 	userName:req.body.name ,
  	 	moneyList: [ 0 ],
  	 };
  	console.log(data)
  	 userName.set(data);
  	return res.redirect('/money')
  })
  .get('/money', (req, res) => {
     userName.once('value').then( (snapshot) => {
     	var Name = snapshot.val().userName;
     	var List = snapshot.val().moneyList;
     	var total = 0;
     	for(var i =0; i < List.length; i++){
     		total += parseInt(List[i]);
     	}
     	res.render('pages/money', {
     		userName: Name,
     		moneyList: List,
     		moneyTotal: total,
     	});
     });
  })
  .post('/saveMoney', (req, res) => {
  	userName.once('value').then( (snapshot) => {
  		var saveMoney = req.body.money;
     	var Name = snapshot.val().userName;
     	var List = snapshot.val().moneyList;

     	if(saveMoney > 0){
     		List.push(saveMoney);
     	}

     	var total = 0;
     	for(var i =0; i < List.length; i++){
     		total +=  parseInt(List[i]);
     	}
     	userName.set({
     		userName: Name,
     		moneyList: List,
     	});

     	res.render('pages/money', {
     		userName: Name,
     		moneyList: List,
     		moneyTotal: total,
     	});
     });
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
