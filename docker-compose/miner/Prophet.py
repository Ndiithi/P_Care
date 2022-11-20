import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from prophet import Prophet


from flask import Flask
from flask import request
from db import database

def p_predict(product_id, periodspan):
    db = database()
    connection = db.get_db_con()

    query_string = '''SELECT date_purchased as date,quantity FROM sales  where product_id="%s"''' %(product_id)

    # query_string = '''SELECT date_purchased as date,quantity FROM sales "Indicator ID"=%s and "Org unit id"=%s ''' %(indicatorid,ouid)
    SQL_Query = pd.read_sql_query(query_string, connection)

    data = pd.DataFrame(SQL_Query)

    m = Prophet(growth='logistic')
    data.columns = ['ds', 'y']
    
    data['cap'] = 1.2 * data['y'].max()
    data['floor'] = 0
    m.fit(data)

    if (periodspan == None):
        periodspan = int(10)

    # if (periodtype == None or periodtype == 'monthly'):
    #     periodtype = 'M'
    # elif (periodtype == 'yearly'):
    #     periodtype = 'Y'

    future = m.make_future_dataframe(periods = periodspan,freq = 'M')
    future['cap'] = 1.2 * data['y'].max()
    future['floor'] = 0

    forecast = m.predict(future)

    trend = []
    projection = []
    seasonal_trend = []

    for index in range(len(forecast.ds)):
        month=str(forecast.ds[index].month)
        year=forecast.ds[index].year
        if(len(month)==1):
            month='0%s'%month
        _date=str(year)+str(month)
        
        _trend={}
        _trend["time"]=_date
        _trend["value"]=forecast.trend[index]
        trend.append(_trend)

        _seasonal_trend = {}
        _seasonal_trend["time"] = _date
        _seasonal_trend["value"] = forecast.yearly[index]
        seasonal_trend.append(_seasonal_trend)

        _projection = {}
        _projection["time"] = _date
        _projection["value"] = forecast.yhat[index]
        projection.append(_projection)
        
    _series_data ={
        "trend": trend,
        "projection": projection,
        "seasonality": seasonal_trend
    }
    return _series_data
