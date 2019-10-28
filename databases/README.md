# Database usage notes (for developers)

There are two ways to run the mongo server (hosting the db)
- As a Windows service (auto-starts with the computer)
- As a process (needs to be started before starting the bot)

In terms of setup, two possible ways really.

## Option A
Run server locally and connect to it. The same host currently running the bot would also run the mongo instance (either as a service or manually starting).
+ Simple, no extra hosting cost. Only thing needed is to install new software in the host machine.
- Only local apps can connect to the db. If the data is to be used by multiple apps/services, they would all need to run from this machine.

## Option B
Run server in some other machine and have bot connect to it on startup.
+ Better for scaling. DB can be shared by multiple apps/services as long as they can connect to this machine.
- More complex to setup. Need machine and public IP, might need to add firewall rules.


# Install and start the server
For complete MongoDB installation instructions, see [the manual](https://docs.mongodb.com/manual/installation/).

1. Download the latest [MongoDB Community version](https://www.mongodb.com/download-center/community)
2. Create a database directory (not needed if you use the repo directly, db_path is `path-to-repo\databases\mongo`) 
3. Start a mongod process: `mongod --dbpath=c:\catbot\databases\mongo` (replace with right path). If you get 'mongod not recognized', try adding MongoDB directory to the windows PATH. If not possible, run this instead `D:\Programs\MongoDB\4.2\bin\mongod.exe` (replace with correct path, where MongoDB is installed). 

Once the server is started, the bot (and any other app interacting with db) can be started and connect properly.

# Populate MongoDB with data from json files
Running `populate_db.js` will populate the db with the current data in the json (requires 'mongodb' npm module installed). 
This basically reads the json in memory, connects to db, deletes everything, recreate the collections (table equivalent) and insert all the items.

Ideally this should only need to be ran once when setting up the db, all future edits should happen on the db directly.



