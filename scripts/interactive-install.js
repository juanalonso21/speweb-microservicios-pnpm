const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const appsDir = path.join(rootDir, 'apps');
const libsDir = path.join(rootDir, 'libs');

function getDirectories(source) {
    if (!fs.existsSync(source)) return [];
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

const apps = getDirectories(appsDir).map(name => ({ name, type: 'app' }));
const libs = getDirectories(libsDir).map(name => ({ name, type: 'lib' }));
const allModules = [...apps, ...libs];

if (allModules.length === 0) {
    console.log('No apps or libs found.');
    process.exit(0);
}

let cursor = 0;
let selected = new Set();
const limit = allModules.length;

function render() {
    console.clear();
    console.log('Selecciona los módulos (Espacio para seleccionar, Enter para confirmar):\n');

    allModules.forEach((module, index) => {
        const isSelected = selected.has(index);
        const isCursor = index === cursor;
        const checkbox = isSelected ? '[x]' : '[ ]';
        const pointer = isCursor ? '>' : ' ';
        console.log(`${pointer} ${checkbox} [${module.type}] ${module.name}`);
    });

    console.log('\n(Usa las flechas para moverte, Espacio para marcar/desmarcar, Enter para terminar)');
}

// Start with raw mode for selection
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

render();

const onKeypress = (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else if (key.name === 'up') {
        cursor = (cursor - 1 + limit) % limit;
        render();
    } else if (key.name === 'down') {
        cursor = (cursor + 1) % limit;
        render();
    } else if (key.name === 'space') {
        if (selected.has(cursor)) {
            selected.delete(cursor);
        } else {
            selected.add(cursor);
        }
        render();
    } else if (key.name === 'return') {
        if (selected.size === 0) {
            console.log('\n\n❌ Debes seleccionar al menos un módulo.');
            setTimeout(render, 1500);
            return;
        }

        cleanupAndProceed();
    }
};

process.stdin.on('keypress', onKeypress);

function cleanupAndProceed() {
    process.stdin.removeListener('keypress', onKeypress);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
    }

    // Add a delay to ensure the 'Enter' keypress doesn't bleed into the readline question
    setTimeout(() => {
        // Create readline interface ONLY after raw mode is done
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const selectedModules = Array.from(selected).map(index => allModules[index]);

        console.log('\n\nMódulos seleccionados:');
        selectedModules.forEach(m => console.log(` - ${m.name}`));

        const askPackageName = () => {
            rl.question('\nIngresa el nombre del paquete a instalar: ', (packageName) => {
                packageName = packageName.trim();
                if (!packageName) {
                    // If empty (e.g. due to Enter key bleed), ask again
                    return askPackageName();
                }

                console.log('\nTipo de dependencia:');
                console.log('1. dependencies (prod)');
                console.log('2. devDependencies (dev)');
                console.log('3. peerDependencies (peer)');

                rl.question('\nSelecciona el tipo (default: 1): ', (typeAnswer) => {
                    let saveFlag = '';
                    switch (typeAnswer.trim()) {
                        case '2':
                            saveFlag = '-D';
                            break;
                        case '3':
                            saveFlag = '--save-peer';
                            break;
                        default:
                            saveFlag = ''; // default is prod
                    }

                    console.log('\nIniciando instalación...');

                    for (const mod of selectedModules) {
                        const command = `pnpm add ${packageName} ${saveFlag} --filter ${mod.name}`;
                        console.log(`\n📦 Instalando en ${mod.name}...`);
                        console.log(`> ${command}`);
                        try {
                            execSync(command, { stdio: 'inherit', cwd: rootDir });
                        } catch (error) {
                            console.error(`❌ Error instalando en ${mod.name}`);
                        }
                    }

                    console.log('\n✅ Proceso finalizado.');
                    rl.close();
                    process.exit(0);
                });
            });
        };

        askPackageName();
    }, 500);
}
