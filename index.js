const Fuse = require('fuse.js');
const glob = require('glob');

module.exports = (pattern, option) => {
  const list = glob.sync(pattern, option).map(file => {
    return {
      file,
      tokens: file.split('/').join(' ')
    };
  });

  return new Fuse(list, {
    keys: ['tokens'],
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.4
  });
};
