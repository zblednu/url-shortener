#! /usr/bin/sh
sudo su postgres -c '
	psql -c "drop database shortener" -c "drop role shortener"
'
