create user sb3api with password 'sb3api';
create database sb3 owner postgres;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sb3api;
GRANT USAGE ON schema public TO postgres;
GRANT USAGE ON schema public TO sb3api;
ALTER ROLE sb3api SET statement_timeout='300000';
\c sb3;
