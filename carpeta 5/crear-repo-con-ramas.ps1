# Script de automatización para crear un repositorio Git independiente con ramas
# Uso: .\crear-repo-con-ramas.ps1

Write-Host "🚀 Inicializando repositorio Git para DevfSeek..." -ForegroundColor Cyan

# Directorio de salida en una ruta fuera o independiente para evitar conflictos de subrepositorios
$targetDir = "$env:USERPROFILE\Documents\DevfSeek-Repo"

if (Test-Path $targetDir) {
    Remove-Item -Recurse -Force $targetDir
}

New-Item -ItemType Directory -Path $targetDir | Out-Null
Set-Location $targetDir

git init -b main
Write-Host "✅ Repositorio Git inicializado en rama 'main'" -ForegroundColor Green

# Función para copiar archivos excluyendo node_modules y dist
function Copy-ProjectFiles($source, $destination) {
    Get-ChildItem -Path $source -Exclude "node_modules", "dist", ".git" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $destination -Recurse -Force
    }
}

# Crear .gitignore base en el nuevo repositorio
@"
node_modules/
dist/
.env
*.log
.DS_Store
"@ | Out-File -FilePath "$targetDir\.gitignore" -Encoding utf8

# 1. Commit inicial en main
git add .gitignore
git commit -m "chore: initial commit with gitignore"

# 2. Rama parte-1: Tailwind CSS y React Hook Form
git checkout -b parte-1
Copy-ProjectFiles "$PSScriptRoot\1-frontend-tailwind-hookform" "$targetDir"
git add .
git commit -m "feat(parte-1): integracion de Tailwind CSS y validacion con React Hook Form"
Write-Host "✅ Rama 'parte-1' creada y con commit limpio" -ForegroundColor Green

# 3. Rama parte-2: Consumo de Ollama e Historial
git checkout -b parte-2
Copy-ProjectFiles "$PSScriptRoot\2-ollama-chat-history" "$targetDir"
git add .
git commit -m "feat(parte-2): custom hook useOllamaHook y componente de History"
Write-Host "✅ Rama 'parte-2' creada y con commit limpio" -ForegroundColor Green

# 4. Rama parte-3: Global State con useContext & useReducer
git checkout -b parte-3
Copy-ProjectFiles "$PSScriptRoot\3-usecontext-global-state" "$targetDir"
git add .
git commit -m "feat(parte-3): createContext, Provider y useContext para estado global"
Write-Host "✅ Rama 'parte-3' creada y con commit limpio" -ForegroundColor Green

# 5. Rama parte-4: Backend con Express
git checkout -b parte-4
New-Item -ItemType Directory -Force -Path "$targetDir\express" | Out-Null
Copy-ProjectFiles "$PSScriptRoot\4-servidor-express" "$targetDir\express"
git add .
git commit -m "feat(parte-4): servidor Express con endpoint Hola Mundo y API"
Write-Host "✅ Rama 'parte-4' creada y con commit limpio" -ForegroundColor Green

# 6. Volver a main e integrar la version completa
git checkout main
Copy-ProjectFiles "$PSScriptRoot\proyecto-devfseek-completo" "$targetDir"
git add .
git commit -m "feat: proyecto DevfSeek full-stack completo integrado"
Write-Host "✅ Rama 'main' actualizada con la version unificada" -ForegroundColor Green

Write-Host "`n🎉 ¡Listo! Tu repositorio independiente está listo en la carpeta:" -ForegroundColor Yellow
Write-Host "   $targetDir" -ForegroundColor White
Write-Host "`nPara subirlo a GitHub:" -ForegroundColor Cyan
Write-Host "   1. Crea un repo vacío en github.com"
Write-Host "   2. cd `"$targetDir`""
Write-Host "   3. git remote add origin <URL_DE_TU_REPO>"
Write-Host "   4. git push --all origin"
