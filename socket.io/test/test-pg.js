const { Client } = require('pg');

const client = new Client({
    password: "Xie__",
    port: 5432,
    user: "postgres",
})

async function start (){
    try {
        await client.connect()

        const res = await client.query("SELECT $1::text as message", ["Hello world!"])
        console.log(res)
        await client.end()
    } catch(e) {
        console.log(e)
    }
}

start()