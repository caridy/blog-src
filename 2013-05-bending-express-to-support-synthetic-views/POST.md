## Bending Express to Support Synthetic Views

Express<sup>[1]</sup> is a wonderful piece of software, not because of the quality of the code and documentation--which are very good--but because of its simplicity. That simplicity, however, comes with a cost that forces users to follow certain guidelines; this is the case of views in Express, where a view has to be bound to a filesystem path. When creating complex applications, there are tricks you can use to get to the next level. Today, I want to touch on the view resolution mechanism in Express and how to tweak it to support what I call synthetic views.

Express supports a variety of view engines, and you can use almost any kind of template language by simply looking for the proper engine implementation for Express. Moreover, creating a new engine is a breeze, and it works wonderfully. Here is an example of Express using @ericf's `express3-handlebars`<sup>[2]</sup> package, which adds support for Handlebars<sup>[3]</sup> templates.

```
var app = require('express')();

app.engine('hbs', require('express3-handlebars')());
app.set('view engine', 'hbs');

app.get('/', function (req, res, next) {
  res.render('foo');
});
app.listen(3000);
```

In the example above, when requesting `http://localhost:3000/`, the template `./views/foo.hbs` will be located, compiled, and rendered. As you can see, this is fairly simple, and on top of that, Express will take care of many details, including the cache mechanism for each view, error handling, and filesystem path resolution. It just works and performs remarkably well, but note that it is also bound to a filesystem path to locate `foo.hbs`.

## Express's Internal View Mechanism

The very simple mechanism used by Express to resolve the view is based on few basic configurations:

 * `view cache` - enables view template compilation caching and is enabled in production by default.
 * `view engine` - is the default engine extension.
 * `views` - is the view directory path, which defaults to `process.cwd() + '/views'`.

and, of course, the view engine registration process: 

 * `app.engine(ext, callback)` - registers the given template engine `callback` as `ext`.

Based on those three settings and the registration method, Express will be able to locate, cache, and render any view within the `root` folder if there is a corresponding engine. When calling `res.render(name, options)`, Express creates a new instance of `View`, which is an internal component. As part of the constructor, the instance tries to locate the template in the filesystem based on the `views` setting (using the filename extension from `name` to detect the proper engine to render the template or the fallbacks to the default engine from `view engine` setting), and then allocates an internal property called `path`.

## Express' Synthetic Views

What if our templates are not in the filesystem and instead need to be accessed from somewhere else, such as a database, through a REST-like API, or even from memory in the form of compiled JavaScript? How can we gain control over the template resolution? In the end, a view instance is just an object with a `render` method that expects some `data` to produce a blob in an asynchronous fashion.

By default, Express implements a `View` constructor, which takes care of the resolution mechanism. In the past, the `View` component was private, and there was no way to modify it. That has changed in the `express@3.2.0`, thanks to @tjholowaychuk for merging our pull request which allows you to a) replace the `View` constructor and b) modify the `View` constructor shipped with `express`. This is also possible through the new `view` configuration. Here is an example of how to replace the `View` component:

```
var app = require('express')();

app.set('view', MyNewViewConstructor);

app.get('/', function (req, res, next) {
  res.render('foo');
});
app.listen(3000);
```

On the other hand, if you just want to tweak the `View` component shipped with `express`, you can still do it by modifying the `prototype` methods. Here is an example of that:

```
var app = require('express')();

app.set('view').prototype.lookup = function(name) {
  // and here you can do whatever you want to resolve the template by name
  return myInternalResolver(path); // which returns a path!
};

app.get('/', function (req, res, next) {
    res.render('foo');
});
app.listen(3000);
```

If you decide to change the `View` component's prototype, you will have to validate your implementation against new versions of Express because the implementation might change in the future. My recommendation at this point is to replace it with your own implementation as it is a fairly simple component with a very specific responsibility.

[View.js] describes how to implement a `View` component that can work with a DB, a REST-like API, a global memory hash, or a compiled view accessible through `require()`. It pretty much covers all the options you have today to fetch and compile a template bound to a view instance.

## Compiled Templates for Better Performance and Interoperability

At Yahoo!, we have been trying to create building blocks to help blur the line between the server and client, where sharing code and logic is critical. Knowing that compiling views on the client is just no longer an option, we pre-compiled views into JavaScript for the client runtime. Later, we thought, why not use those same pre-compiled templates on the server as well? It just made a lot of sense.

This use case drove us to propose a change in Express, so we can create a custom `View` to allow templates to be required and allocated in memory during the application's boot process, when the filesystem representation for the templates is no longer needed and a memory allocation is used instead. That single twist improves performance and reduces the forking in the logic to interoperate between runtimes.

## Conclusion

The new `view` setting introduced in `express@3.2.0` provides a simple way to replace or customize the internal mechanism to look up and render views in Express. This new feature can allow us to blur the line between the look up and compile processes as well as eliminate the filesystem requirements, and ultimately enables us to use remote templates, remote compilers, a pre-compiler, and even fetch templates from a database or a REST-like API, while still relying on Express to handle the view instances cache and invocation mechanism.

## References

 1. [Express](http://expressjs.com) (Official Website)
 2. [express3-handlebars](http://github.com/ericf/express3-handlebars) (GitHub)
 3. [Handlebars](http://handlebarsjs.com/) (Official Website)