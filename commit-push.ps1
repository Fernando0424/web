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
    Write-Host "Commit y push completados exitosamente."
}

# Uso del script
Submit-GitCommitAndPush -mensaje "Estructura del proyecto 1"