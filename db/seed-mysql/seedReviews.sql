-- create database of just reviews from original multitable yelp database

create database yelp_db_reviews;

use yelp_db_reviews;

create table yelp_db_reviews.review like yelp_db.review;

alter table yelp_db_reviews.review disable keys;

insert into yelp_db_reviews.review select * from yelp_db.review;

alter table yelp_db_reviews.review enable keys;


-- http://www.shayanderson.com/mysql/how-to-copy-mysql-table-from-one-database-to-another-database.htm

-- mysql -u root < seed-reviews.sql