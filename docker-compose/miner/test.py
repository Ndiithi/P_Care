import logging
import mysql.connector
from mysql.connector import Error


connection = mysql.connector.connect(host='db',
                                                      database='pharma',
                                                      user='root',
                                                      password='pass',
                                                      port='3306')
print('connected to db')
          