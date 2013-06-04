caridy.name blog
================

Goals & Design
--------------

My ultimate goal with this repository is to be able to build my blog website (http://caridy.name/) as static html and css. I really liked `flipflop`, but I don't like `jade`, I prefer something like `handlebars` for my templates. Also, I wanted to customize the default implementation, including the urls.


Installation
------------

Install using npm:

```shell
$ git clone https://github.com/caridy/blog-src.git
$ cd blog-src
$ npm install
```


Usage
-----

## Development mode

```shell
$ npm run start
$ open http://localhost:8080/index.html
```

## Build mode

```shell
$ npm run build
$ open ../caridy.github.com/blog/index.html
```


License
-------

This repository is built using [Pure][] and a custom version of [FlipFlop][]. All code and content on this repository is licensed under [Creative Commons][] unless stated otherwise.

[Pure]: http://purecss.io/
[FlipFlop]: https://github.com/caridy/flipflop
[Creative Commons]: http://creativecommons.org/licenses/by/3.0/us/
