create user sb3api with password 'sb3api';
create database sb3 owner sb3api;

ALTER ROLE sb3api SET statement_timeout='300000';
\c sb3;
