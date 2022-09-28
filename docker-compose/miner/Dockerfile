FROM python:3.10.4
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    net-tools \
    iputils-ping \
    mariadb-client \
    openssl \
    libzip-dev
WORKDIR /opt
COPY docker-compose/miner/requirements.txt /opt
COPY docker-compose/miner/Miner.py /opt
COPY docker-compose/miner/db.py /opt
COPY docker-compose/miner/Prophet.py /opt
RUN pip install -r requirements.txt
ENV FLASK_APP=Miner.py
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]