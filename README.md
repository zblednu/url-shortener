This project is a locally running url-shortener, i.e. a service that stores lengthy urls in a database, server pulls up information from database and does a redirect

## Usage
- Install postgres package for your respective repo, create a db cluster with `initdb` and start a server on port 5432
- Clone the repo
- Run script to set up a database
    1. `# chmod u+x db-bootstrap.sh`
    1. `$ ./db-bootstrap.sh`
- Start the server
`# node server.js`
- Navigate to localhost:3000 in your browser for a web interface



# url-shortener
