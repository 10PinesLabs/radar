# README

[![CircleCI](https://circleci.com/gh/10PinesLabs/ruben-radar.svg?style=svg)](https://circleci.com/gh/10PinesLabs/ruben-radar)

## Proyect Set Up:

We are using ruby 2.3.8 so install it with rvm.

Then run `gem install bundler` and `bundle install`.

Once done, you have to create a `.env` file with the environment variables property set. 
Copy and paste the `developer.env` file and rename it to `.env`. 
Ask help to another team member to find the content of the file.

### Database configuration with Docker:

First, install docker and docker compose.

Then run `docker-compose up &` and `docker-compose stop` to stop the container. 

And that is all!

### Database configuration with Postgres:

In order to run this app, you must install postgreSQL:

```shell
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib libpq-dev
```

Then create the database user:

```shell
sudo -u postgres createuser -s ruben
```

And set its password, so open the console:

```shell
sudo -u postgres psql
```

The PostgreSQL console is indicated by the *postgres=#* prompt. At the PostgreSQL prompt, enter this command to set the password for the database user that you created:

```shell
postgres=# \password azucar
```

At last, grant premissions for the user like this:

```shell
postgres=# ALTER USER ruben CREATEDB;
```

If you want to grant all permissions and  owner these are the commands:

```shell
postgres=# GRANT ALL PRIVILEGES ON  DATABASE database_name to new_user;
postgres=# ALTER DATABASE database_name owner to new_user;
```
