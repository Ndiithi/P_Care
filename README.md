# App  Portal.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#Installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#cron">Restart cron</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
Pharmaceutical management system.
.

<!-- GETTING STARTED -->
## Getting Started

This project is powered by the laravel framework.


### Prerequisites

1. Install docker and docker-compose on your local machine.

### Installation

* clone project
  ```sh
  git clone https://github.com/GOK-NPHL/pharma
  ```

* cd
  ```sh
  cd pharma/
  ```

Edit the the .evn file and update with needed parameters like your ODK username and password, database connection, and set the SESSION_DOMAIN to the relevant server domain.

Check the defaults on the docker files for the db and nginx ports.

* build project
  ```sh
  docker-compose build
  ```

* run project
  ```sh
  docker-compose up -d
  ```

If you get the error

``` 
Version in "./docker-compose.yml" is unsupported
```

Uninstall your docker & docker compose installation and update to the latest.

eg on Ubuntu:

```
sudo apt unistall docker-compose
```

Once the containers are up and running, you can check status by running docker container list, you need to finalize set up.

Run below to get into the app continer session:

```
sudo docker-compose exec  app bash
```

you could add -u 0 get into the sudo session in the container.

Next install required dependencies for the application as below:

```
npm install  && composer install
```

Once that is done, we set up the database with initial data.

```
php artisan migrate

and

php artisan db:seed
```

finally, we compile our fron end resources for prodcution:

```
npm run prod
```

To run on development environment, its recommended you run to allow hot loading:

```
npm run watch
```


#### Defaults.

Database, web server and PHP settings are done from the docker files.


<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.
