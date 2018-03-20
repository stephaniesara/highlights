use reviews;

select * from review into outfile '/review.csv' fields terminated by ',' enclosed by '"' lines terminated by '\n'

-- mysql -u root < mysqlToCSV.sql