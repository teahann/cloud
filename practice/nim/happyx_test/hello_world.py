from happyx import new_server

app = new_server('127.0.0.1', 5000)

@app.get('/')
def home():
    return "Hello world!"

app.start()
