const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

//
//memberCollect


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qz7kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const memberCollection = client.db("familyMember").collection("member");

        app.post('/create', async (req, res) => {
            const member = req.body;
            const result = await memberCollection.insertOne(member);
            res.send(result);
        });

        app.get('/create', async (req, res) => {
            const query = {};
            const cursor = memberCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.delete('/create/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await memberCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/create/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name:body.name,
                    email:body.email
                },
            };

            const result = await memberCollection.updateOne(filter,updateDoc,options);
            res.send(result)
        })

    }
    finally {

    }
}

run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Required done!!')
})

app.listen(port, () => {
    console.log('Running', port);
})
