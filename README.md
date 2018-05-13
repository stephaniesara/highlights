# Chompy - Highlights

> This microservice highlights the most popular keywords in a business's reviews and displays them on the page.

## Related Projects

* https://github.com/team-coco/reviews-service
* https://github.com/team-coco/Bottom-right-sidebar
* https://github.com/team-coco/Navbar-Service

## Table of Contents

1.  [Usage](#Usage)
2.  [Requirements](#requirements)
3.  [Development](#development)

## Usage

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

* Node 9.8.0
* etc

## Development

### Installing Dependencies

From within the root directory:

```sh
$ npm install -g webpack
$ npm install
```

### Starting Webpack and Running Server

From within the root directory:

```sh
$ npm start
```

### Open Chrome, and PROFIT!

You can render restaurants of id **n** where **n** is between 1-267:

```sh
http://localhost:3002/?id=n
```

Example: render restaurant of id **n**=122:

```sh
http://localhost:3002/?id=122
```

Default: render restaurant of id **n**=1:

```sh
http://localhost:3002
```
