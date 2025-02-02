import pg from "pg";
const { Client } = pg;


const client = new Client( {
  database: "url-shortener",
});
await client.connect();

async function addEntry(url) {
  const randomString = new Array(8).fill(null);

  randomString.forEach((elem, idx, arr) => {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    arr[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
  });
  const shortened = randomString.join("");
  console.log(shortened, url);

 await client.query(`
    insert into maps values ('${shortened}', '${url}');
  `);
}

await addEntry(process.argv[2]);

await client.end();



