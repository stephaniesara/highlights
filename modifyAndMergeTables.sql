-- modify table of 5M copies of reviews
-- merge with table of original 5M reviews
-- add auto_increment iterator to table of all 10M reviews

use reviews;

alter table review_copy drop primary key;

alter table review_copy drop column id;

alter table review_copy change hash_id id varchar(22) not null primary key first;

insert into review select * from review_copy;

alter table review drop primary key;

alter table review add iterator int not null auto_increment primary key;

-- mysql -u root < modifyAndMergeTables.sql