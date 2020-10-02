const fs = require('fs');
const { parse } = require('path');
const mhwFolder = './source_files/MonsterDataImages/assets/mhw/monster/';
const mhguFolder = './source_files/MonsterDataImages/assets/mhgu/monster/';

const mhwFileNames = [];
const mhwFileObjects = {};
const mhguFileNames = [];
const mhguFileObjects = {};

fs.readdirSync(mhwFolder).forEach(file => {
  mhwFileNames.push(file);
});

fs.readdirSync(mhguFolder).forEach(file => {
  mhguFileNames.push(file);
});

fill(mhwFileNames, mhwFileObjects, mhwFolder);
fill(mhguFileNames, mhguFileObjects, mhguFolder);

write('./source_files/MonsterDataImages/mhw_monster_map.json', mhwFileObjects);
write(
  './source_files/MonsterDataImages/mhgu_monster_map.json',
  mhguFileObjects
);

function replaceAll(string, searchString, replaceString) {
  if (string.includes(searchString) === false) return string;
  return replaceAll(
    string.replace(searchString, replaceString),
    searchString,
    replaceString
  );
}

function write(location, object) {
  fs.writeFile(location, JSON.stringify(object, null, 2), err => {
    if (err) console.log(err);
  });
}

function fill(directorys, object, folder) {
  for (const dir of directorys) {
    const fileInfo = parse(dir);
    const name = replaceAll(
      replaceAll(fileInfo.name, ' ', '').replace('HZV', ''),
      '_',
      ''
    );
    const title = replaceAll(fileInfo.name.replace('_HZV', ''), '_', ' ');

    object[name.toLowerCase()] = {
      title: title,
      imagePath: `${folder}${dir}`,
      fileName: dir
    };
  }
}
