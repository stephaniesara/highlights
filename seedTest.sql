-- seed a test table of 100 reviews to test db manipulation

use reviews;

create table test like review;

alter table test disable keys;

insert into test select * from review limit 100;

alter table test enable keys;

-- mysql -u root < seedTest.sql