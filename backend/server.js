//acces a express
const express = require ("express");
const cors = require ("cors");
const mysql= require ("mysql");

const app= express();
app.use(express.json());
app.use(cors());

//connection a la base de données
 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"medecin"
})

//API aller a localhost:8081 pour voir le message
app.get("/",(req,res)=> {
    const sql = "select * from medecin";
    db.query(sql,(err,data)=>{
        if(err) return res.json("error");
        return res.json(data);
    })
})

// Modifier la route pour correspondre à l'URL dans la requête axios
app.post("/add/", (req, res) => {
    const sql = "INSERT INTO medecin (Nom, NombreJ, TauxJ) VALUES (?, ?, ?)";
    const values = [
        req.body.nom,
        req.body.nbj,
        req.body.tj
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

app.put("/ed/:Numed", (req, res) => {
    const sql = "update medecin set Nom=?, NombreJ=? , TauxJ=? where Numed=?";
    const values = [
        req.body.nom,
        req.body.nbj,
        req.body.tj
    ];

    const Numed=req.params.Numed;
    db.query(sql,[ ...values,Numed], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});


app.delete("/medecin/:Numed", (req, res) => {
    const sql = "delete from medecin where Numed=?";
   
    const Numed=req.params.Numed;
    db.query(sql,[ Numed], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});


//le port pour run fonction commande node server.js
app.listen(8004, () => {
    console.log("lestening");
})