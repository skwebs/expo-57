# =====================================================================
# setup-dev-build.ps1
# Convert Expo Go project to Local Development Build
# Version : 1.1.0
# Author  : Satish Sharma + ChatGPT (reviewed/fixed)
#
# Changelog (1.1.0):
#  - Fixed: package.json/app.json now saved as UTF-8 WITHOUT BOM
#           (BOM was breaking some JSON parsers / older Node tooling)
#  - Fixed: null-safety on devDependencies lookup in Phase 6 (was
#           accessing .PSObject.Properties on a possibly-null object)
#  - Fixed: backup restore on prebuild failure was missing in the
#           "sync existing native project" branch of Phase 5
#  - Added: PowerShell version guard (requires 5.1+)
# =====================================================================
# Phase 1: Validate Commands
# =====================================================================
$ErrorActionPreference = "Stop"

# -------------------------------------------------------
# PowerShell version guard
# -------------------------------------------------------

if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Host "[ERROR] PowerShell 5.1 or later is required. Detected: $($PSVersionTable.PSVersion)" -ForegroundColor Red
    exit 1
}

# -------------------------------------------------------
# Colors
# -------------------------------------------------------

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-WarningMsg {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# -------------------------------------------------------
# JSON save helper (writes UTF-8 WITHOUT BOM)
# -------------------------------------------------------

function Save-JsonFile {
    param(
        [Parameter(Mandatory = $true)] $Object,
        [Parameter(Mandatory = $true)] [string]$Path
    )

    $json = $Object | ConvertTo-Json -Depth 100
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    $fullPath = Join-Path (Get-Location) $Path
    [System.IO.File]::WriteAllText($fullPath, $json, $utf8NoBom)
}

# -------------------------------------------------------
# Header
# -------------------------------------------------------

Clear-Host

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "      Expo Go  ->  Development Build Setup Utility"
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host ""

# -------------------------------------------------------
# Helper
# -------------------------------------------------------

function Test-Command {
    param(
        [string]$Command
    )

    return [bool](Get-Command $Command -ErrorAction SilentlyContinue)
}

# -------------------------------------------------------
# Validate Commands
# -------------------------------------------------------

Write-Info "Checking required commands..."

$requiredCommands = @(
    "node",
    "npm",
    "npx"
)

foreach ($cmd in $requiredCommands) {

    if (Test-Command $cmd) {

        Write-Success "$cmd found."

    }
    else {

        Write-ErrorMsg "$cmd is not installed."

        exit 1

    }

}

# -------------------------------------------------------
# Validate Project
# -------------------------------------------------------

Write-Info "Checking Expo project..."

if (!(Test-Path "package.json")) {

    Write-ErrorMsg "package.json not found."

    exit 1

}

if (!(Test-Path "app.json")) {

    Write-ErrorMsg "app.json not found."

    exit 1

}

Write-Success "Project files found."

# -------------------------------------------------------
# Read package.json
# -------------------------------------------------------

try {

    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

}
catch {

    Write-ErrorMsg "Invalid package.json"

    exit 1

}

if ($null -eq $packageJson.dependencies.expo) {

    Write-ErrorMsg "Current directory is not an Expo project."

    exit 1

}

Write-Success "Expo project verified."

# -------------------------------------------------------
# Read app.json
# -------------------------------------------------------

try {

    $appJson = Get-Content "app.json" -Raw | ConvertFrom-Json

}
catch {

    Write-ErrorMsg "Invalid app.json"

    exit 1

}

Write-Success "app.json verified."

# -------------------------------------------------------
# Backup Folder
# -------------------------------------------------------

$backupFolder = ".backup"

if (!(Test-Path $backupFolder)) {

    New-Item `
        -ItemType Directory `
        -Path $backupFolder | Out-Null

}

Copy-Item "package.json" "$backupFolder/package.json" -Force
Copy-Item "app.json" "$backupFolder/app.json" -Force

Write-Success "Backup created."

Write-Host ""
Write-Host "Phase 1 Completed." -ForegroundColor Green
Write-Host ""

# -------------------------------------------------------
# Phase 2 - Install expo-dev-client
# -------------------------------------------------------

Write-Info "Checking expo-dev-client..."

$installed = $false

if ($packageJson.dependencies) {

    if ($packageJson.dependencies.PSObject.Properties.Name -contains "expo-dev-client") {

        $installed = $true

        Write-Success "expo-dev-client already installed. ($($packageJson.dependencies.'expo-dev-client'))"

    }

}

if (!$installed -and $packageJson.devDependencies) {

    if ($packageJson.devDependencies.PSObject.Properties.Name -contains "expo-dev-client") {

        $installed = $true

        Write-Success "expo-dev-client already installed. ($($packageJson.devDependencies.'expo-dev-client'))"

    }

}


if (!$installed) {

    Write-Info "Installing expo-dev-client..."

    & npx expo install expo-dev-client

    if ($LASTEXITCODE -ne 0) {

        Write-ErrorMsg "Failed to install expo-dev-client."

        Write-WarningMsg "Restoring backup..."

        Copy-Item ".backup/package.json" "package.json" -Force
        Copy-Item ".backup/app.json" "app.json" -Force

        exit 1

    }

    Write-Success "expo-dev-client installed."

    # Reload package.json
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

}

# -------------------------------------------------------
# Verify Installation
# -------------------------------------------------------

$verify = $false

if ($packageJson.dependencies) {

    if ($packageJson.dependencies.PSObject.Properties.Name -contains "expo-dev-client") {

        $verify = $true

    }

}

if (!$verify -and $packageJson.devDependencies) {

    if ($packageJson.devDependencies.PSObject.Properties.Name -contains "expo-dev-client") {

        $verify = $true

    }

}

if (!$verify) {

    Write-ErrorMsg "expo-dev-client installation could not be verified."

    exit 1

}

Write-Success "Dependency verification completed."

Write-Host ""
Write-Host "Phase 2 Completed." -ForegroundColor Green
Write-Host ""

# -------------------------------------------------------
# Phase 3 - Configure app.json
# -------------------------------------------------------

Write-Info "Configuring app.json..."

# Ensure expo object exists
if ($null -eq $appJson.expo) {

    $appJson | Add-Member `
        -MemberType NoteProperty `
        -Name expo `
        -Value ([PSCustomObject]@{})

}

# Ensure plugins property exists
if ($null -eq $appJson.expo.plugins) {

    $appJson.expo | Add-Member `
        -MemberType NoteProperty `
        -Name plugins `
        -Value @()

}

# Convert plugin list to ArrayList for easier modification
$pluginList = New-Object System.Collections.ArrayList

foreach ($plugin in $appJson.expo.plugins) {

    [void]$pluginList.Add($plugin)

}

# Check whether plugin already exists
$exists = $false

foreach ($plugin in $pluginList) {

    if ($plugin -is [string]) {

        if ($plugin -eq "expo-dev-client") {

            $exists = $true
            break

        }

    }

    elseif ($plugin -is [System.Object[]]) {

        if ($plugin[0] -eq "expo-dev-client") {

            $exists = $true
            break

        }

    }

}

if ($exists) {

    Write-Success "expo-dev-client plugin already exists."

}
else {

    [void]$pluginList.Add("expo-dev-client")

    Write-Success "expo-dev-client plugin added."

}

$appJson.expo.plugins = $pluginList

# Save app.json (UTF-8, no BOM)
Save-JsonFile -Object $appJson -Path "app.json"

Write-Success "app.json updated."

Write-Host ""
Write-Host "Phase 3 Completed." -ForegroundColor Green
Write-Host ""

# -------------------------------------------------------
# Phase 4 - Update package.json Scripts
# -------------------------------------------------------

Write-Info "Updating package.json scripts..."

# Ensure scripts object exists
if ($null -eq $packageJson.scripts) {

    $packageJson | Add-Member `
        -MemberType NoteProperty `
        -Name scripts `
        -Value ([PSCustomObject]@{})

}

# Scripts to add
$scriptsToAdd = @{
    "dev"              = "expo start --dev-client"
    "android"          = "expo run:android"
    "ios"              = "expo run:ios"
    "prebuild"         = "expo prebuild"
    "prebuild:clean"   = "expo prebuild --clean"
}

foreach ($script in $scriptsToAdd.GetEnumerator()) {

    if ($packageJson.scripts.PSObject.Properties.Name -contains $script.Key) {

        Write-WarningMsg "Script '$($script.Key)' already exists. Skipping."

    }
    else {

        $packageJson.scripts | Add-Member `
            -MemberType NoteProperty `
            -Name $script.Key `
            -Value $script.Value

        Write-Success "Added script '$($script.Key)'."

    }

}

# Save package.json (UTF-8, no BOM)
Save-JsonFile -Object $packageJson -Path "package.json"

# Reload package.json
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

Write-Success "package.json updated."

Write-Host ""
Write-Host "Phase 4 Completed." -ForegroundColor Green
Write-Host ""

# -------------------------------------------------------
# Phase 5 - Generate / Sync Native Project
# -------------------------------------------------------

Write-Info "Checking native project..."

$androidExists = Test-Path "android"
$iosExists = Test-Path "ios"

if (-not $androidExists -or -not $iosExists) {

    Write-Info "Native folders not found."
    Write-Info "Running expo prebuild..."

    & npx expo prebuild

    if ($LASTEXITCODE -ne 0) {

        Write-ErrorMsg "expo prebuild failed."

        Write-WarningMsg "Restoring backup..."

        Copy-Item ".backup/package.json" "package.json" -Force
        Copy-Item ".backup/app.json" "app.json" -Force

        exit 1

    }

    Write-Success "Native project generated."

}
else {

    Write-Success "Native project already exists."

    $answer = Read-Host "Sync native project using 'expo prebuild'? (Y/N)"

    if ($answer -match '^(Y|y)$') {

        Write-Info "Syncing native project..."

        & npx expo prebuild

        if ($LASTEXITCODE -ne 0) {

            Write-ErrorMsg "expo prebuild failed."

            Write-WarningMsg "Restoring backup..."

            Copy-Item ".backup/package.json" "package.json" -Force
            Copy-Item ".backup/app.json" "app.json" -Force

            exit 1

        }

        Write-Success "Native project synced."

    }
    else {

        Write-WarningMsg "Skipped native project sync."

    }

}

Write-Host ""
Write-Host "Phase 5 Completed." -ForegroundColor Green
Write-Host ""

# -------------------------------------------------------
# Phase 6 - Final Verification & Summary
# -------------------------------------------------------

Write-Info "Running final verification..."

# Reload latest files
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$appJson = Get-Content "app.json" -Raw | ConvertFrom-Json

$success = $true

# Expo SDK
$expoVersion = $packageJson.dependencies.expo

# expo-dev-client
$devClientVersion = $null

if ($packageJson.dependencies -and ($packageJson.dependencies.PSObject.Properties.Name -contains "expo-dev-client")) {

    $devClientVersion = $packageJson.dependencies."expo-dev-client"

}
elseif ($packageJson.devDependencies -and ($packageJson.devDependencies.PSObject.Properties.Name -contains "expo-dev-client")) {

    $devClientVersion = $packageJson.devDependencies."expo-dev-client"

}
else {

    Write-ErrorMsg "expo-dev-client not found."
    $success = $false

}

# Plugin verification
$pluginFound = $false

foreach ($plugin in $appJson.expo.plugins) {

    if ($plugin -is [string]) {

        if ($plugin -eq "expo-dev-client") {

            $pluginFound = $true
            break

        }

    }
    elseif ($plugin -is [System.Object[]]) {

        if ($plugin[0] -eq "expo-dev-client") {

            $pluginFound = $true
            break

        }

    }

}

if (!$pluginFound) {

    Write-ErrorMsg "expo-dev-client plugin missing."
    $success = $false

}

# Native folders
$androidExists = Test-Path "android"
$iosExists = Test-Path "ios"

if ($androidExists) {
    Write-Success "Android native project found."
} else {
    Write-WarningMsg "Android native project not found."
}

if ($iosExists) {
    Write-Success "iOS native project found."
} else {
    Write-WarningMsg "iOS native project not found (this is normal on Windows or Android-only projects)."
}

if (-not $androidExists -and -not $iosExists) {

    Write-ErrorMsg "No native project was generated."
    $success = $false

}

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Magenta
Write-Host "                 DEVELOPMENT BUILD READY"
Write-Host "=========================================================" -ForegroundColor Magenta
Write-Host ""

Write-Host ("Expo SDK".PadRight(25) + ": " + $expoVersion)

if ($devClientVersion) {

    Write-Host ("expo-dev-client".PadRight(25) + ": " + $devClientVersion)

}

Write-Host ("Plugin".PadRight(25) + ": " + ($(if($pluginFound){"OK"}else{"Missing"})))
Write-Host ("Android Native".PadRight(25) + ": " + ($(if($androidExists){"Yes"}else{"No"})))
Write-Host ("iOS Native".PadRight(25) + ": " + ($(if($iosExists){"Yes"}else{"Not Generated"})))

Write-Host ""

if ($success) {

    Write-Success "Project successfully converted to Development Build."

}
else {

    Write-ErrorMsg "Verification failed."

    exit 1

}

Write-Host ""
Write-Host "Next Commands"
Write-Host "-------------" -ForegroundColor Cyan
Write-Host ""
Write-Host "npm run android"
Write-Host "npm run dev"
Write-Host ""

Write-Success "Setup completed successfully."

Write-Host ""
