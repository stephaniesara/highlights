use reviews;

create table highlight (
	iterator int(11) not null,
	business_id varchar(22) not null,
	sentence varchar(255) default null,
	keyword varchar(22) default null,
	count int(11) default null,
	photo_url varchar(22) default null,
	is_business_photo tinyint(1) default null,
	key `by_iterator` (`iterator`)
);

load data infile '/Users/stephaniesarachong/Dropbox/*HackReactor/SDC/highlights/db/aggregate/aggregateData2.csv'
into table highlight
fields terminated by ','
enclosed by '"'
lines terminated by '\r\n'
ignore 1 rows;

-- mysql -u root < loadAggregateData.sql