BUILD_DIR = './build';

fs = require('fs-extra');
hamlc = require('haml-coffee');

function green(str) {
    process.stdout.write("\x1B[32m" + str + "\x1B[0m\n");
}

function red(str) {
    process.stdout.write("\x1B[31m" + str + "\x1B[0m\n");
}

fs.removeSync(BUILD_DIR);
green('Remove ' + BUILD_DIR);

fs.mkdirSync(BUILD_DIR);
green('Create ' + BUILD_DIR);

haml = fs.readFileSync('./views/index.hamlc').toString();
html = hamlc.compile(haml)();
fs.writeFileSync(BUILD_DIR + '/index.html', html);
green('render HTML');

stylesheetsDir = BUILD_DIR + '/stylesheets';
fs.mkdirSync(stylesheetsDir);
[
    'fotorama.css',
    'normalize.css',
    'style.css',
    // fotorama dependency. must be the same path as fotorama.css
    'fotorama.png',
    'fotorama@2x.png'
].forEach(function(file) {
    fs.copy('./public/stylesheets/' + file, stylesheetsDir + '/' + file);
});
green('copy CSS');

imagesDir = BUILD_DIR + '/images';
[
    'slider',
    '04_services.png',
    '04_stage_1.png',
    '04_stage_2.png',
    '04_stage_3.png',
    '05_map.png',
    'background.png',
    'background_inverse.png',
    'eduard.png',
    'line.png',
    'nikita.png',
    'oksana.png',
    'title_img.png',
    'wood.png'
].forEach(function(file) {
    fs.copy('./public/images/' + file, imagesDir + '/' + file);
});
green('copy Images');


jsDir = BUILD_DIR + '/js';
fs.mkdirSync(jsDir);
['fotorama.js'].forEach(function(file) {
    fs.copy('./public/js/' + file, jsDir + '/' + file);
});
green('copy Javascripts');


[
    'GOGOL.eot',
    'GOGOL.svg',
    'GOGOL.woff',
    'pts55f.eot',
    'pts55f.woff'
].forEach(function(file) {
    fs.copy('./public/' + file, BUILD_DIR + '/' + file);
});
green('copy Fonts');
