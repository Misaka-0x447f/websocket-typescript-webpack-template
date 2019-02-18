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
### Including managed websocket library?
No but can be installed later. [ClusterWS](https://github.com/ClusterWS) is my choice.  
Please be noticed that cWS as a dependencies of ClusterWS v3 will not working on all OS.  
You may want to include a version without langC yourself.

### add SSL without have to save cert to repo with CI?
Consider making a localhost proxy for your app. See
https://blog.nodeswat.com/set-up-a-secure-node-js-web-application-9256b8790f11

### Unix compatibility unknown.
Compatibility for bash is not tested, only for Windows OS now.

### IIS config file included in build.
For helping deployment on ⊞ Microsoft Azure with ⊞ Microsoft IIS.

### Use port 'process.env.PORT' if you need to let it work on cloud.
You shouldn't miss this out.  
Misaka has been purchased an azure support plan which costs 29 USD and 2 days to figure out where is the problem.  
[https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs#download-the-sample](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs#download-the-sample)
[https://waded.org/2014/10/15/node-js-on-azure-gotchas/](https://waded.org/2014/10/15/node-js-on-azure-gotchas/)
### Not a http server template.
This template is not meant to be used for serve http content.  
So we load program with node at development time, use webpack for production.

### Built with warnings.
It's expected. See
[https://github.com/websockets/ws/issues/1220](https://github.com/websockets/ws/issues/1220)

### How to import js lib installed by npm without webpack 
https://stackoverflow.com/questions/38127953/typescript-avoid-require-statements-in-compiled-javascript
