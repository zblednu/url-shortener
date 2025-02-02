import pg from "pg";
const { Client } = pg;


const client = new Client( {
  database: "url-shortener",
});
await client.connect();

async function add(url) {
  const randomString = new Array(8).fill(null);

  randomString.forEach((elem, idx, arr) => {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    arr[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
  });
  const shortened = randomString.join("");

  await client.query(`
    insert into maps values ('${shortened}', '${url}');
  `);
}

//TODO: check if entry exists
async function get(shortened) {
  const res = await client.query(`
    select original from maps where shortened = '${shortened}';
  `);

  return res.rows[0].original;
}

if (process.argv[2] === "get") {
  console.log(await get(process.argv[3]));
} 
else if (process.argv[2] === "add") {
  await add(process.argv[3]);
}

await client.end();



