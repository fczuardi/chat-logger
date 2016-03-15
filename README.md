# chat-logger
A logger for telegram chat messages.

## Usage

```shell
npm install chat-logger redux
```

ES5
```javascript
var createStore = require('redux').createStore;
var loggerReducer = require('chat-logger').loggerReducer;

var store = createStore(loggerReducer);
```

ES2015
```javascript
import { createStore } from 'redux';
import { loggerReducer } from 'chat-logger';

let store = createStore(loggerReducer);
```

[More examples][examples].

## Contribute

```shell
git clone https://github.com/convcomm/chat-logger.git
cd chat-logger
npm install
```

To build the npm package under ```dist/npm```
```
npm run build:npm
```

To run the [telegram example][telegram]:

- edit the [examples/telegram.js][stdoutjs] file and comment/uncomment the lines
as instructed in the file.
- make a copy of the [.env-sample][evsample] file with another name, edit it to
include your telegram key(s)

```
cp .env-sample .env

```

- edit .env to include the telegram key(s) for your bot(s) and then…

```
source .env
npm start
```


## License

- [AGPL-3][license]

[examples]: https://github.com/calamar-io/chat-logger/tree/master/examples
[telegram]: https://github.com/calamar-io/chat-logger/blob/master/examples/telegram.js
[evsample]: https://github.com/calamar-io/chat-logger/blob/master/.env-sample
[license]: https://github.com/calamar-io/chat-logger/blob/master/LICENSE.txt
