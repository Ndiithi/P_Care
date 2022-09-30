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
    model = auto_arima(df["quantity"], start_p=0, start_q=0, max_p=10, max_q=10,
                       m=12, start_P=0, start_Q=0, max_Q=10, max_P=10,
                       seasonal=True, error_action='ignore',
                       suppress_warnings=True, stepwise=False, randon_state=20,
                       n_fits=50)
    model.fit(df["quantity"])
    forecast = model.predict(n_periods=periodspan)

    forecast = pd.DataFrame(forecast, index=pd.date_range(
        start=df.index[-1], periods=periodspan, freq='M'), columns=['quantity'])

    projection = []
    for index, row in forecast.iterrows():
        print (index)
        try:
            if(row['quantity']==row['quantity']): #check for NANs
                _projection = {}
                _projection["time"] = index
                _projection["value"] = row['quantity']
                projection.append(_projection)
        except Exception as e:
            print(e)

    return jsonify(projection)
