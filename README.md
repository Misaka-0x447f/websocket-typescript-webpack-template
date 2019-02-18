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
 or follow the instructions next:
```bash
sudo -i
apt update
apt install openssl nginx -y
```
```bash
mkdir /etc/ssl-cert-storage
```
get your let's encrypt cert from certbot or other online tools. copy to this dir.  
  
make a file for DHE ciphers.
```
openssl dhparam -out dhparam.pem 4096
```
```bash
cd /etc/nginx/conf.d/
vi default.conf
```
write the nginx conf like this:
```conf
# Remove server identifiers to help against enumeration
server_tokens off;

# Add some protection headers for ClickJacking 
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

# Redirect to https
server {
    listen 80;
    server_name <domain>;
    return 301 https://$host$request_uri;
}

# Redirect to https and remove www
server {
    listen 80;
    server_name www.<domain>;
    return 301 https://example.com$request_uri;
}

server {
    # Listen for HTTPS connections using http2;
    listen       443 ssl http2;
    server_name  <domain>;

    # Define where to find the certificates
    # These will be under the letsencrypt folder 
    ssl_certificate      /<path-to-crt>/domain-cer.crt;
    ssl_certificate_key  /<path-to-crt>/domain-key.key;

    # Cache SSL handshakes
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout  5m;

    # Use our new Diffie-Hellman parameter for DHE ciphersuites, recommended 4096 bits
    ssl_dhparam /<path-to-crt>/dhparam.pem;

    ssl_prefer_server_ciphers   on;

    # disable SSLv3(enabled by default since nginx 0.8.19) since it's less secure then TLS http://en.wikipedia.org/wiki/Secure_Sockets_Layer#SSL_3.0
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    # ciphers chosen for forward secrecy and compatibility
    # http://blog.ivanristic.com/2013/08/configuring-apache-nginx-and-openssl-for-forward-secrecy.html
    ssl_ciphers "ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";

    # Define our root folder
    root /<app-dir>/webroot/;

    # Use gzip to save on bandwith
    gzip on;
    gzip_comp_level 7;
    gzip_types text/plain text/css text/javascript application/javascript;
    gzip_proxied any;

    # Tell the browser to force HTTPS
    add_header Strict-Transport-Security "max-age=31536000;";

    # Optimise internal TCP connections
    tcp_nopush on;
    tcp_nodelay on;

    # Define static file serving from /<app-dir>/webroot/public folder
    location /public {
        sendfile on;
        include /etc/nginx/mime.types;
        charset utf-8;
        expires 30d;
    }

    # Proxy all other requests to our Node.js application
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass      http://0.0.0.0:<port>;
        proxy_redirect  off;
    }
}
```
restart nginx.
```
/etc/init.d/nginx restart
```
test if everything is ok.

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
