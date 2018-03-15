use yelp_db_reviews;

create table review_copy like review;

alter table review_copy disable keys;

insert into review_copy select * from review;

alter table review_copy enable keys;


-- http://www.shayanderson.com/mysql/how-to-copy-mysql-table-from-one-database-to-another-database.htm

-- mysql -u root < double-reviews.sql