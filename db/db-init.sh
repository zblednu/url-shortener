#! /usr/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres <<-EOSQL
	CREATE TABLE maps (
		id char(8) PRIMARY KEY,
		url varchar(800) NOT NULL
	);
EOSQL
