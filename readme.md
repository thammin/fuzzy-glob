# fuzzy-glob

> Fuzzy-search in file system. Like `quick-open` in Visual Studio Code.


## Install

```
$ npm install --save fuzzy-glob
```


## Usage

```js
const fuzzyGlob = require('fuzzy-glob');

/*
  Assume we have a directory named `src` contains bunches of files.
  src
  ├── a.js
  ├── b.js
  └── sub
      ├── c.js
      └── d.js
*/

const fuse = fuzzyGlob('./src/**/*');

// We can find files like `c.js` and `d.js` by fuzzy searching the related word `sub`
fuse.search('sub');
/*
> [{
    file: '/Users/Paul/src/sub'
  }, {
    file: '/Users/Paul/src/sub/c.js'
  }, {
    file: '/Users/Paul/src/sub/d.js'
  }]
*/

// Or ignore directory matches by passing `nodir` to option.
fuse.search('sub', { nodir: true });
/*
> [{
    file: '/Users/Paul/src/sub/c.js'
  }, {
    file: '/Users/Paul/src/sub/d.js'
  }]
*/


// We also can use tokens for matching.
fuse.search('sub d');
/*
> [{
    file: '/Users/Paul/src/sub/d.js'
  }]
*/
```

## License

MIT © [Paul Young](https://github.com/thammin)
