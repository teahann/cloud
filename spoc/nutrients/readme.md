## About Nutrients
- Build list of foods while searching [USDA's FoodData Central](https://fdc.nal.usda.gov/).
- Calculate total nutrients of all selected foods.
#### Future features
- Compare total nutrients to recommended daily intake goals.
- View missing nutrients (essential and non-essential).

## Run development server
#### Set environment variable
- Get an [API key](https://fdc.nal.usda.gov/api-key-signup.html) from FoodDataCentral.
- Save [.env.example](./.env.example) as [.env](./.env), with API key at the end of the URL.
#### Install and run
```bash
npm install
npm run dev
```
#### In another terminal, run [root domain](../home/readme.md)'s server with this server's URL in the [iframe source](https://github.com/teahann/spoc/blob/main/home/index.html#L11).
```html
<iframe src="http://localhost:5173"></iframe>
```

## Run in production
#### Build project
```bash
npm run build
```
- Base directory is /nutrients
- Publish directory is /nutrients/dist
