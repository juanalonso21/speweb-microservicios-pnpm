const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const workspaceRoot = path.resolve(__dirname, '..');

function createApp(appName) {
    if (!appName) {
        console.error('Application name is required.');
        process.exit(1);
    }

    const appPath = path.join(workspaceRoot, 'apps', appName);

    if (fs.existsSync(appPath)) {
        console.error(`Application "${appName}" already exists.`);
        process.exit(1);
    }

    console.log(`Creating NestJS application "${appName}"...`);
    try {
        // Run nest g app
        execSync(`nest g app ${appName}`, {
            cwd: workspaceRoot,
            stdio: 'inherit'
        });

        console.log(`Creating package.json for "${appName}"...`);

        // Create package.json
        const packageJsonContent = {
            name: appName,
            version: "0.0.1",
            private: true,
            scripts: {
                "build": "nest build",
                "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
                "start": "nest start",
                "start:dev": "nest start --watch",
                "start:debug": "nest start --debug --watch",
                "start:prod": "node dist/main",
                "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
                "test": "jest",
                "test:watch": "jest --watch",
                "test:cov": "jest --coverage",
                "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
                "test:e2e": "jest --config ./test/jest-e2e.json"
            },
            dependencies: {},
            devDependencies: {}
        };

        fs.writeFileSync(
            path.join(appPath, 'package.json'),
            JSON.stringify(packageJsonContent, null, 2)
        );

        console.log('Installing dependencies...');
        execSync('pnpm install', { cwd: workspaceRoot, stdio: 'inherit' });

        console.log(`\nApplication "${appName}" created successfully!`);
        console.log(`You can now run: pnpm add <dependency> --filter ${appName}`);

    } catch (error) {
        console.error('Error creating application:', error);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length > 0) {
    createApp(args[0]);
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the name of the new application: ', (appName) => {
        rl.close();
        createApp(appName);
    });
}
