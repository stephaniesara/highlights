use yelp_db_reviews;

create table test like review;

alter table test disable keys;

insert into test select * from review limit 100;

alter table test enable keys;