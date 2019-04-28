# Thallium RTMP Streaming

### Dependencies:
- Nginx
- FFMpeg
- libxml2
- libxslt1-dev
- build-essential
- libpcre3
- libpcre3-dev
- libssl-dev

```
# apt install ffmpeg libxml2 libxslt1-dev build-essential libpcre3 libpcre3-dev libssl-dev
```

### Build Nginx

1. Download and unpack latest [Nginx stable version](http://nginx.org/en/download.html)
2. Download and unpack [RTMP module](https://github.com/arut/nginx-rtmp-module/archive/master.zip)
3. Build Nginx:
    ```
    $ cd nginx*
    $ ./configure --with-http_ssl_module --with-http_xslt_module --add-module=../nginx-rtmp-module-master
    $ make
    $ sudo make install
    ```
4. Copy this repository to ```/usr/local/nginx```
5. Run ```/usr/local/nginx/sbin/nginx```
