import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const pool = new pg.Pool({
    user: "postgres",
    password: "Mojo7412!",
    host: "localhost",
    port: 5432,
    database: "grocery_db"
})

//middleware\\
app.use(express.json());
app.use(cors());

//ROUTES\\

//create item
app.post('/list', async(req, res) => {
    try {
        const { content } = req.body;
        pool.query("INSERT INTO list (content) VALUES($1) RETURNING *", 
        [content]
        ).then((result) => {
            res.send(result.rows[0])
        })
    } catch (err) {
        console.log(err.message);
    }
})

//get all items
app.get("/list", async(req, res) => {
    try {
        pool.query("SELECT * FROM list")
        .then((result) => {
            res.send(result.rows)
        })
    } catch (err) {
        console.error(err.message)
    }
})

//get one item
app.get("/list/:id", async(req, res) => {
    const { id } = req.params;
    try {
        pool.query("SELECT * FROM list WHERE list_id = $1", [id])
        .then((result) => {
            res.send(result.rows[0]);
        })
    } catch (err) {
        console.error(err.message)
    }
})

//update item
app.patch("/list/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        pool.query("UPDATE list SET content = $1 WHERE list_id = $2 RETURNING *", [content, id])
        .then((result) => {
            res.send(result.rows[0])
        })
    } catch (err) {
        console.error(err.message)
    }
})

//delete item
app.delete("/list/:id", async(req, res) => {
    try {
        const { id } = req.params;
        pool.query("DELETE FROM list WHERE list_id = $1", [id])
        .then((result) => {
            res.json("Item was deleted!");
        })
    } catch (error) {
        console.error(err.message)
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});
