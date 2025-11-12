# Script para hacer commit y push automáticamente
function Submit-GitCommitAndPush {
    param (
        [string]$mensaje
    )
    # Agrega todos los cambios
    git add .
    # Hace el commit con el mensaje
    git commit -m $mensaje
    # Empuja los cambios
    git push origin main
    Write-Host "Agregado idioma inglés"
}

# Uso del script
Submit-GitCommitAndPush -mensaje "Agregado idioma inglés"