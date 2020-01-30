#!/bin/sh

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE DATABASE awesome_api;
CREATE DATABASE awesome_api_test;
CREATE DATABASE awesome_api_prod;
EOSQL
