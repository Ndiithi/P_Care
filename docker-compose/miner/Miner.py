from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
from pmdarima import auto_arima
from Prophet import p_predict
from flask import jsonify
from flask import Flask
from flask import request
from db import database


app = Flask("miner")


@app.route('/forecast/<product_id>/', strict_slashes=False)
def miner(product_id):
    app.logger.debug('Miner initiated...')

    # the number of dependent values to be generated based on periodtype (give prediction data to which time)
    periodspan = int(request.args.get('periodspan'))
    # periodtype = request.args.get('periodtype')  # can yealy 'Y' or monthly 'M'
    model = request.args.get('model')
    print("modelling")
    if (model == 'arima'):
        return predict(product_id, periodspan)
    elif (model == 'prophet'):
        print("calling prophet")
        app.logger.info("getting prophet prediction")
        return p_predict(product_id, periodspan)


def predict(product_id, periodspan):
    db = database()
    connection = db.get_db_con()

    query_string = '''SELECT product_id,date_purchased ,quantity FROM sales  where product_id="%s"''' % (
        product_id)

    # query_string = '''SELECT date_purchased as date,quantity FROM sales "Indicator ID"=%s and "Org unit id"=%s ''' %(indicatorid,ouid)
    df = pd.read_sql_query(query_string, connection)

    df = df.loc[df['product_id'] == product_id][[
        "date_purchased", "quantity"]].set_index("date_purchased")

    # 
    #     p is the parameter associated with the auto-regressive aspect of the model, which incorporates past values. For example, forecasting that if it rained a lot over the past few days, you state its likely that it will rain tomorrow as well.

    #     d is the parameter associated with the integrated part of the model, which effects the amount of differencing to apply to a time series. You can imagine an example of this as forecasting that the amount of rain tomorrow will be similar to the amount of rain today, if the daily amounts of rain have been similar over the past few days.

    #     q is the parameter associated with the moving average part of the model.
    # 
    model = auto_arima(df["quantity"], start_p=10, start_q=10, max_p=30, max_q=30,
                       m=12,
                       seasonal=True, error_action='ignore',
                       suppress_warnings=True, stepwise=False
                       )
    model.fit(df["quantity"])
    forecast = model.predict(n_periods=periodspan)

    forecast = pd.DataFrame(forecast, index=pd.date_range(
        start=df.index[-1], periods=periodspan, freq='M'), columns=['quantity'])

    projection = []
    
    for index, row in df.iterrows():
        try:
            if (row['quantity'] == row['quantity']):  # check for NANs
                _projection = {}
                _projection["time"] = index
                _projection["value"] = int(row['quantity'])
                projection.append(_projection)
        except Exception as e:
            print(e)

    for index, row in forecast.iterrows():
        try:
            if (row['quantity'] == row['quantity']):  # check for NANs
                _projection = {}
                _projection["time"] = index
                _projection["value"] = row['quantity']
                projection.append(_projection)
        except Exception as e:
            print(e)

    return projection
