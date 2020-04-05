const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = 'dbUser';
const pass = 'dY4ZQNWHCcBgQrcZ';
const uri = "mongodb+srv://dbUser:dY4ZQNWHCcBgQrcZ@cluster0-lggqa.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Asad', 'Monir', 'Sohana', 'Shahnaz', 'Raju', 'Mannan'];


//GET method;
app.get('/', (req, res) => {
    const fruit = {
        product: 'Kola',
        price: 2500
    }
    res.send(fruit);
});


// Dynamic data pass;
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
});

//POST method;
app.post('/addProduct', (req, res) => {

    const product = req.body;

    console.log(product);
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
           if(err){
               console.log(err);
               res.status(500).send({message:err});
           }
           else{
             res.send(result.ops[0]);  
           }            
        });
        client.close();
      });
});



app.listen(3000, () => console.log('Listening to port 3000'));