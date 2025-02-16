#! /usr/bin/sh
set -e

DB_USER=$(cat ./db-user)

psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres <<-EOSQL
	CREATE USER $DB_USER;
	CREATE DATABASE $DB_USER OWNER $DB_USER;
EOSQL

psql -v ON_ERROR_STOP=1 --username $DB_USER --dbname $DB_USER <<-EOSQL
	CREATE TABLE maps (
		id char(8) PRIMARY KEY,
		url varchar(800) NOT NULL
	);
EOSQL
		

