const fs = require('fs');
const mhwFolder = 'assets/mhw/monster/';
const mhguFolder = 'assets/mhgu/monster/';

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

for (const i in mhwFileNames) {
  const monsterName = mhwFileNames[i]
    .substr(0, mhwFileNames[i].indexOf('_HZV'))
    .split('_')
    .join('');

  const monsterTitle = mhwFileNames[i]
    .substr(0, mhwFileNames[i].indexOf('_HZV'))
    .split('_')
    .join(' ');

  mhwFileObjects[monsterName.toLowerCase()] = {
    title: monsterTitle,
    imagePath: `${mhwFolder}${mhwFileNames[i]}`,
    fileName: mhwFileNames[i]
  };
}

for (const i in mhguFileNames) {
  const monsterName = mhguFileNames[i]
    .substr(0, mhguFileNames[i].indexOf('.png'))
    .split('_')
    .join('')
    .split(' ')
    .join('');

  const monsterTitle = mhguFileNames[i]
    .substr(0, mhguFileNames[i].indexOf('.png'))
    .split('_')
    .join(' ');

  mhguFileObjects[monsterName.toLowerCase()] = {
    title: monsterTitle,
    imagePath: `${mhguFolder}${mhguFileNames[i]}`,
    fileName: mhguFileNames[i]
  };
}

write('./mhw_monster_map.json', mhwFileObjects);
write('./mhgu_monster_map.json', mhguFileObjects);

function write(location, object) {
  fs.writeFile(location, JSON.stringify(object, null, 2), err => {
    if (err) console.log(err);
  });
}
