import pg from "pg";
const { Client } = pg;


const client = new Client( {
  database: "url-shortener",
});
await client.connect();
//cats

function generateRandomString() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';

  const LENGTH = 8;
  const randomString = new Array(LENGTH).fill(null);
  randomString.forEach((elem, idx, arr) => {
    arr[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
  });

  return randomString.join("");
}

async function add(url) {
  const res = await client.query(`
    select shortened from maps where original = '${url}';
  `);
  if (res.rowCount) {
    return res.rows[0].shortened;
  }

  let shortened;
  let exists;
  do {
    shortened = generateRandomString();

    exists = await client.query(`
     select from maps where shortened = '${shortened}';
    `).rowCount;
  } while (exists);

  await client.query(`
    insert into maps values ('${shortened}', '${url}');
  `);

  return shortened;
}

async function get(shortened) {
  const res = await client.query(`
    select original from maps where shortened = '${shortened}';
  `);

  if (!res.rowCount) {
   throw new Error("no such map"); 
  }

  return res.rows[0].original;
}

if (process.argv[2] === "get") {
  console.log(await get(process.argv[3]));
} 
else if (process.argv[2] === "add") {
  console.log(await add(process.argv[3]));
}

await client.end();



