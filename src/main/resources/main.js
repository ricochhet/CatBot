const fs = require('fs');
const { parse } = require('path');
const mhwFolder = './source_files/MonsterDataImages/assets/mhw/monster/';
const mhguFolder = './source_files/MonsterDataImages/assets/mhgu/monster/';
const mhguIconFolder ='./source_files/MonsterDataImages/assets/mhgu/monster_icons/';
const mhrFolder = './source_files/MonsterDataImages/assets/mhr/monster/';
const mhrIconFolder ='./source_files/MonsterDataImages/assets/mhr/monster/assets/icons/';

const mhwFileNames = [];
const mhwFileObjects = {};
const mhguFileNames = [];
const mhguFileObjects = {};
const mhguIconFileNames = [];
const mhguIconFileObjects = {};
const mhrFileNames = [];
const mhrFileObjects = {};
const mhrIconFileNames = [];
const mhrIconFileObjects = {};

fs.readdirSync(mhwFolder).forEach(file => {
  mhwFileNames.push(file);
});

fs.readdirSync(mhguFolder).forEach(file => {
  mhguFileNames.push(file);
});

fs.readdirSync(mhguIconFolder).forEach(file => {
  mhguIconFileNames.push(file);
});

fs.readdirSync(mhrFolder).forEach(file => {
  mhrFileNames.push(file);
});

fs.readdirSync(mhrIconFolder).forEach(file => {
  mhrIconFileNames.push(file);
});


fill(mhwFileNames, mhwFileObjects, mhwFolder);
fill(mhguFileNames, mhguFileObjects, mhguFolder);
fill(mhguIconFileNames, mhguIconFileObjects, mhguIconFolder);
fill(mhrFileNames, mhrFileObjects, mhrFolder);
fill(mhrIconFileNames, mhrIconFileObjects, mhrIconFolder);

write('./source_files/MonsterDataImages/mhw_monster_map.json', mhwFileObjects);
write(
  './source_files/MonsterDataImages/mhgu_monster_map.json',
  mhguFileObjects
);
write(
  './source_files/MonsterDataImages/mhgu_monster_icon_map.json',
  mhguIconFileObjects
);
write(
  './source_files/MonsterDataImages/mhr_monster_map.json',
  mhrFileObjects
);
// write(
//   './source_files/MonsterDataImages/mhr_monster_icon_map.json',
//   mhrIconFileObjects
// );
blah()
function blah() {
  const fix = {}
  for (const i in mhrIconFileObjects) {
    item = mhrIconFileObjects[i]
    item["title"] = item["title"].replace(" Icon", "")
    fix[item["title"].toLowerCase().split(" ").join("")] = item
  }
  write(
    './source_files/MonsterDataImages/mhr_monster_icon_map.json',
    fix
  );
}

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
