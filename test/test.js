const path = require('path');
const test = require('ava');
const fuzzyGlob = require('..');

test('match file correctly.', t => {
  const fuse = fuzzyGlob(path.resolve(__dirname, 'fixture/**/*'));
  const result = fuse.search('main.js');

  t.true(result.length === 1);
  t.regex(result[0].file, /main\.js$/);
});

test('match several alike files.', t => {
  const fuse = fuzzyGlob(path.resolve(__dirname, 'fixture/**/*'));
  const result = fuse.search('sub');

  t.true(result.length === 5);
  result.forEach(match => t.regex(match.file, /sub.*$/));
});

test('match files after filtering.', t => {
  const fuse = fuzzyGlob(path.resolve(__dirname, 'fixture/*.@(png|jpg)'));
  const result = fuse.search('sub');

  t.true(result.length === 2);
  result.forEach(match => t.regex(match.file, /sub\.(png|jpg)$/));
});

test('match nested files except directories.', t => {
  const fuse = fuzzyGlob(path.resolve(__dirname, 'fixture/**/*'), {
    nodir: true
  });
  const result = fuse.search('nested');

  t.true(result.length === 3);
  result.forEach(match => t.regex(match.file, /nested.*$/));
});

test('match directories only.', t => {
  const fuse = fuzzyGlob(path.resolve(__dirname, 'fixture/**{/,*/}'));
  const result = fuse.search('nested');

  t.true(result.length === 2);
  result.forEach(match => t.regex(match.file, /nested\/$/));
});
