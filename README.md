# chat-logger
A system to log chat messages.

[![npm version](https://badge.fury.io/js/chat-logger.svg)](https://badge.fury.io/js/chat-logger)
[![Dependency Status](https://david-dm.org/calamar-io/chat-logger.svg)](https://david-dm.org/calamar-io/chat-logger)
[![devDependency Status](https://david-dm.org/calamar-io/chat-logger/dev-status.svg)](https://david-dm.org/calamar-io/chat-logger#info=devDependencies)


## How it works

The system is composed of 3 main parts/applications:

1. Chat relays
  - the bots/daemons that connects to chat networks (such as Telegram) or
  message queues (such as rabbitMQ)
2. Persistent storage
  - the local storage/database that keeps all logged messages from the chats
3. Web UI
  - the web app that displays the logged messages with a nice interface

To run an instance of the chat logger, you will have to setup your chat relays,
choose a local storage and optionally launch the web UI. This documentation
and the project itself is still under heavy development, which means that the
guides below can break between updates.

## Getting Started

### Cloning this repository
First step is to clone this repository. If you just want to use the latest
version, you can clone it with a depth 1 to save bandwidth since the code
history is not important. If you plan to contribute or want to have the full
history, just clone the whole thing:

```shell
# For regular users
git clone --depth 1 https://github.com/calamar-io/chat-logger.git

# For devs over HTTPS:
git clone https://github.com/calamar-io/chat-logger.git

# For devs over SSH:
git clone git@github.com:calamar-io/chat-logger.git
```

### Installing/Updating the development dependencies

Since this project is still under heavy development, I advise you to just
install all the dev dependencies in orther to be able to run most of the build
tasks (npm-scripts). To do that, you will need to have a machinne with a
**recent version of Node.js installed**.

Then, inside the root of the cloned repository folder do:
```shell
npm install
```

### Dev tasks

A list of all available tasks can be obtained by running
```shell
npm run
```

The most important ones for now are the building tasks for generating the web UI
and the starting tasks to launch the main daemons.

#### Building the web UI

To generate the web UI run:
```shell
npm run build:webapp
```

#### Configuring the servers

To configure the different parts of the system, there are a set of expected
environment variables you can set. To do that, make a copy of the [.env-sample][envsample]
file, change the desired variables and run it:

```shell
cp .env-sample .env
nano .env
source .env
```

#### Launching the servers

The tasks with the prefix ```start:something``` are the ones that launch
the individual parts of the system (Chat Relays, Storages and UIs).

**For example:** you
can launch a telegram bot that listen to messages sent to it and outputs the
state of a flux store to the screen (the code under [examples/telegram.js][telegram-example])
with:

```shell
npm run start:telegram
```

(Type Ctrl+C to exit it)

To launch multiple deamons and manage them you can install [pm2][pm2]
and run the tasks with the prefix ```start:pm2:something```.

##### The default setup

Currently the default choice of daemons for chat relay, datastore and ui uses:

- rethinkDB for the database
- http-server for the webserver
- telegram-bot-api for the chat relay

If you have rethinkdb installed, you can create the database and required tables with:

```shell
npm run reset:db
```

If you have pm2 globally installed on your system, you can launch
the default choice of daemons with:

```shell
npm start
```

The web UI will be launched on localhost port ```8081``` and the rethinkDB admin UI on
port ```8080```.

### Manually querying the RethinkDB data explorer

open localhost:8080/#dataexplorer

#### Gett all messages

```
r.db('chat_logger').table('messages').orderBy(r.desc('date'))
```

#### Add messages to a chat session

```
r.db('chat_logger').table('messages').insert([{
  text: "Hello World 7",
  chatId: "414aca94-349a-40fa-a388-1034fa2426bd",
  userId: "a0e3eb3b-c478-434d-93f2-c021361f3cd7",
  id: new Date().getTime(),
  date: new Date().getTime(),
  loggerId: null,
  provider: null
}], {returnChanges: true})
```


## License

- [AGPL-3][license]

[telegram-example]: https://github.com/calamar-io/chat-logger/blob/master/examples/telegram.js
[envsample]: https://github.com/calamar-io/chat-logger/blob/master/.env-sample
[pm2]: http://pm2.keymetrics.io/
[license]: https://github.com/calamar-io/chat-logger/blob/master/LICENSE.txt
