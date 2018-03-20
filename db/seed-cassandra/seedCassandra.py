# UNABLE TO CONNECT

import csv
from pycassa.pool import ConnectionPool
from pycassa.columnfamily import ColumnFamily

pool = ConnectionPool('test', ['127.0.0.1:9042'])
cf = ColumnFamily(pool, "testtable")

with open('test.csv', 'rb') as csvfile:
  reader = csv.DictReader(csvfile)
  for row in reader:
    print str(row)
    key = row['id']
    del row['id']
    cf.insert(key, row)

pool.dispose()

# TO RUN
# $ python
# python shell > python seedCassandra.py