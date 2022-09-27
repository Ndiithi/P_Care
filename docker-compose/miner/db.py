import logging
import mysql.connector
from mysql.connector import Error
from flask import Flask


log = logging.getLogger('miner')

class database:

    def get_db_con(self):
        try:
            print('attempting db connection')

            self.connection = mysql.connector.connect(host='db',
                                                      database='pharma',
                                                      user='root',
                                                      password='pass',
                                                      port='3306')
                
            print('connected to db')
            if self.connection.is_connected():
                return self.connection
                # self.cursor = self.connection.cursor()
                # self.cursor.execute("select database();")
                # record = self.cursor.fetchone()
                # log.info("You're connected to database: %s", record)

        except Error as e:
            print("Error while connecting to MySQL: %s", e)
        
    def close_db_con(self):
        if (self.connection):
            self.cursor.close()
            self.connection.close()
            log.info("db connection is closed")
