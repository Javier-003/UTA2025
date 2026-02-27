import { spawn, execSync } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    fgGreen: "\x1b[32m",
    fgCyan: "\x1b[36m",
    fgYellow: "\x1b[33m",
    fgRed: "\x1b[31m",
};

function clearConsole() {
    process.stdout.write('\x1Bc');
}

function showMenu() {
    clearConsole();
    console.log(`${colors.bright}${colors.fgCyan}=================================`);
    console.log("       MANAGER UTA 2025          ");
    console.log(`=================================${colors.reset}\n`);
    console.log("1. Ejecutar servidor y cliente");
    console.log("2. Instalar todas las dependencias");
    console.log("3. Subir cambios (git push)");
    console.log("4. Jalar cambios (git pull)");
    console.log("5. Salir\n");
    rl.question('Seleccione una opción: ', handleOption);
}

function handleOption(option) {
    switch (option) {
        case '1':
            runServerAndClient();
            break;
        case '2':
            installDependencies();
            break;
        case '3':
            pushChanges();
            break;
        case '4':
            pullChanges();
            break;
        case '5':
            console.log('Saliendo...');
            rl.close();
            process.exit(0);
            break;
        default:
            console.log(colors.fgRed + 'Opción no válida.' + colors.reset);
            setTimeout(showMenu, 1000);
            break;
    }
}

function runServerAndClient() {
    console.log(`\n${colors.fgYellow}Iniciando Servidor y Cliente...${colors.reset}\n`);

    // Usamos npx concurrently para no obligar a que esté instalado globalmente
    const child = spawn('npx', [
        'concurrently',
        '--kill-others',
        '--prefix', 'name',
        '--names', 'SERVER,CLIENT',
        '--prefix-colors', 'bgBlue.bold,bgMagenta.bold',
        `"cd Server && npm run dev"`,
        `"cd Client && npm run dev"`
    ], {
        stdio: 'inherit',
        shell: true
    });

    child.on('close', (code) => {
        console.log(`\nProcesos finalizados con código ${code}`);
        rl.question('\nPresione Enter para volver al menú principal...', () => showMenu());
    });
}

function installDependencies() {
    try {
        console.log(`\n${colors.fgYellow}Instalando dependencias en la Raíz...${colors.reset}`);
        execSync('npm install', { stdio: 'inherit' });

        console.log(`\n${colors.fgYellow}Instalando dependencias en el Servidor...${colors.reset}`);
        execSync('npm install', { cwd: path.join(__dirname, 'Server'), stdio: 'inherit' });

        console.log(`\n${colors.fgYellow}Instalando dependencias en el Cliente...${colors.reset}`);
        execSync('npm install', { cwd: path.join(__dirname, 'Client'), stdio: 'inherit' });

        console.log(`\n${colors.fgGreen}¡Dependencias instaladas con éxito!${colors.reset}`);
    } catch (error) {
        console.error(`${colors.fgRed}Error instalando dependencias: ${error.message}${colors.reset}`);
    }
    rl.question('\nPresione Enter para volver al menú principal...', () => showMenu());
}

function getCurrentBranch() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function pushChanges() {
    try {
        const branch = getCurrentBranch();
        console.log(`\n${colors.fgYellow}Subiendo cambios de la rama: ${colors.bright}${branch}${colors.reset}`);
        execSync(`git push origin ${branch}`, { stdio: 'inherit' });
        console.log(`\n${colors.fgGreen}¡Cambios subidos correctamente!${colors.reset}`);
    } catch (error) {
        console.error(`${colors.fgRed}Error al subir cambios: ${error.message}${colors.reset}`);
    }
    rl.question('\nPresione Enter para volver al menú principal...', () => showMenu());
}

function pullChanges() {
    rl.question(`\n¿De qué rama deseas jalar cambios? (ej. main, develop): `, (sourceBranch) => {
        if (!sourceBranch.trim()) {
            console.log(colors.fgRed + 'Nombre de rama no válido.' + colors.reset);
            return rl.question('\nPresione Enter para volver al menú principal...', () => showMenu());
        }
        try {
            const currentBranch = getCurrentBranch();
            console.log(`\n${colors.fgYellow}Jalando cambios de ${colors.bright}${sourceBranch}${colors.fgYellow} a ${colors.bright}${currentBranch}${colors.reset}...`);
            execSync(`git pull origin ${sourceBranch}`, { stdio: 'inherit' });
            console.log(`\n${colors.fgGreen}¡Cambios jalados correctamente!${colors.reset}`);
        } catch (error) {
            console.error(`${colors.fgRed}Error al jalar cambios: ${error.message}${colors.reset}`);
        }
        rl.question('\nPresione Enter para volver al menú principal...', () => showMenu());
    });
}

showMenu();
 