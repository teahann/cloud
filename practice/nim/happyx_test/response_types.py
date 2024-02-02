from happyx import new_server, JsonResponse, HtmlResponse, FileResponse

app = new_server()

@app.get('/json')
def json_resp():
    return JsonResponse(
      {'key': 'value', 'arr': [1, 2, 3, 4, 5]},
      status_code=200
    )

@app.get('/html')
def html_resp():
    return HtmlResponse(
      '<h1>HTML Response!</h1>',
      status_code=200
    )

@app.get('/file')
def file_resp():
    return FileResponse('cat.png')

app.start()
