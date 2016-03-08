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

[More examples](https://github.com/convcomm/chat-logger/tree/master/examples).

## Contribute

```shell
git clone https://github.com/convcomm/chat-logger.git
cd chat-logger
npm install
npm run build:npm
```

To run the [standard output example](https://github.com/convcomm/chat-logger/blob/master/examples/stdout.js):

```
cp .env-sample .env
```

Edit .env to include the telegram key(s) for your bot(s)

```
source .env
npm start
```


## License

- [AGPL-3](https://github.com/convcomm/chat-logger/blob/master/LICENSE.txt)
