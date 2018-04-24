# README 

[![CircleCI](https://circleci.com/gh/10PinesLabs/ruben-radar.svg?style=svg)](https://circleci.com/gh/10PinesLabs/ruben-radar)

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
Before running application you need to install frontend dependencies:

```shell
npm install
rake assets:precompile
```

