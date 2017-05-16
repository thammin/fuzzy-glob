const Fuse = require('fuse.js');
const glob = require('glob');

module.exports = (pattern, option) => {
  const list = glob.sync(pattern, option).map(file => {
    return { file };
  });

  return new Fuse(list, {
    keys: ['file']
  });
};
