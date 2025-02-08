#! /usr/bin/sh
sudo su postgres -c '
	psql -c "CREATE ROLE shortener LOGIN";
	psql -c "CREATE DATABASE shortener OWNER shortener";
	psql -U shortener shortener -c "CREATE TABLE maps ( \
		id char(8) PRIMARY KEY, \
		url varchar(800) NOT NULL, \
		created date \
	)"
'
