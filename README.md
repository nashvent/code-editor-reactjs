Code editor Front end make in ReactJs Project

## Docker

```
# Build
$ docker build -t nashvent:editor .

# RUN
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    nashvent:editor
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm build`

Generate build directory

