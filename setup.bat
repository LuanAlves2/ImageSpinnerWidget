@echo off
echo ========================================
echo    Image Spinner Widget - Setup Git
echo ========================================
echo.

echo [1/4] Verificando arquivos...
if not exist "ImageSpinnerWidget.js" (
    echo ERRO: ImageSpinnerWidget.js nao encontrado!
    pause
    exit /b 1
)
if not exist "ImageSpinnerWidget.json" (
    echo ERRO: ImageSpinnerWidget.json nao encontrado!
    pause
    exit /b 1
)
if not exist "ImageSpinnerWidget_Builder.js" (
    echo ERRO: ImageSpinnerWidget_Builder.js nao encontrado!
    pause
    exit /b 1
)
if not exist "Alex.jpeg" (
    echo ERRO: Alex.jpeg nao encontrado!
    pause
    exit /b 1
)

echo [2/4] Inicializando Git...
git init
if %errorlevel% neq 0 (
    echo ERRO: Git nao encontrado! Instale o Git primeiro.
    pause
    exit /b 1
)

echo [3/4] Adicionando arquivos...
git add .
git commit -m "Initial commit: SAP Analytics Cloud Image Spinner Widget"

echo [4/4] Configuracao concluida!
echo.
echo ========================================
echo    PROXIMOS PASSOS:
echo ========================================
echo.
echo 1. Crie um repositorio no GitHub:
echo    https://github.com/new
echo    Nome sugerido: ImageSpinnerWidget
echo.
echo 2. Execute os comandos:
echo    git remote add origin https://github.com/SEU-USUARIO/ImageSpinnerWidget.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Atualize as URLs no ImageSpinnerWidget.json:
echo    Substitua SEU-USUARIO pelo seu usuario do GitHub
echo.
echo 4. Registre no SAP Analytics Cloud:
echo    Use o arquivo ImageSpinnerWidget.json
echo.
echo ========================================
echo    Arquivos prontos para commit!
echo ========================================
pause
