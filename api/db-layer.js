import pg from "pg";

console.log("poggers");

function generateRandomString() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';

  const LENGTH = 8;
  const randomString = new Array(LENGTH).fill(null);
  randomString.forEach((elem, idx, arr) => {
    arr[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
  });

  return randomString.join("");
}

export async function add(url) {
  const res = await client.query(`
    select id from maps where url = '${url}';
  `);
  if (res.rowCount) {
    return res.rows[0].id;
  }

  let id;
  let exists;
  do {
    id = generateRandomString();

    exists = await client.query(`
     select from maps where id = '${id}';
    `).rowCount;
  } while (exists);

  await client.query(`
    insert into maps values ('${id}', '${url}');
  `);

  return id;
}

export async function get(id) {
  const res = await client.query(`
    select url from maps where id = '${id}';
  `);

  if (!res.rowCount) {
   throw new Error(`no such map: ${id}`); 
  }

  return res.rows[0].url;
}

const { Client } = pg;

const client = new Client( {
  database: "postgres",
  user: "postgres",
	password: "secret",
	port: 5432,
	host: "db"
});
await client.connect();


process.on("SIGINT", async () => {
  await client.end();
  console.log("terminated client connection");
  process.exit();
});



