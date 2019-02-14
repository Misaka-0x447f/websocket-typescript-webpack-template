## webpack-websocket-typescript-template

### Project setup
Install dependencies.
```
npm install
```

use '-s' for npm silent.
```
npm run start -s
```
## FAQ
### Unix compatibility unknown.
Compatibility for bash is not tested, only for Windows OS now.

### IIS config file included in build.
For helping deployment on ⊞ Microsoft Azure with ⊞ Microsoft windows.

### Not a http server template.
This template is not meant to be used for serve http content.  
So we load program with node at development time, use webpack for production.

### Built with warnings.
It's expected. See
[https://github.com/websockets/ws/issues/1220](https://github.com/websockets/ws/issues/1220)

### How to import js lib installed by npm without webpack 
https://stackoverflow.com/questions/38127953/typescript-avoid-require-statements-in-compiled-javascript
