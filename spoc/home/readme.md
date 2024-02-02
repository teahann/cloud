## About Home
- This is the root domain that hosts [subdomains](https://github.com/teahann/spoc/blob/main/home/app.js#L3) within an iframe.
    - Clicking 'Blog' loads [blog.spoc.zip](https://blog.spoc.zip) in an iframe.
    - Clicking 'Data' loads [data.spoc.zip](https://data.spoc.zip) in an iframe and so on.

## Run development server
#### Get required package
```bash
npm install -g http-server
```
#### Run (port 5000, no cache)
```bash
http-server -p 5000 -c1
```