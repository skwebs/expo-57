# ============================================================
# Expo Android ARM64 APK Builder
# Target ABI: arm64-v8a
# Works with Expo prebuild / React Native Android projects
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Expo Android ARM64 APK Builder" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ------------------------------------------------------------
# 1. Verify Expo project
# ------------------------------------------------------------

if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found." -ForegroundColor Red
    Write-Host "Run this script from your Expo project root." -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/6] Expo project detected." -ForegroundColor Green


# ------------------------------------------------------------
# 2. Generate Android native project if missing
# ------------------------------------------------------------

if (-not (Test-Path "android")) {
    Write-Host ""
    Write-Host "[2/6] Android folder not found. Running Expo prebuild..." -ForegroundColor Yellow

    npx expo prebuild --platform android

    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Expo prebuild failed." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}
else {
    Write-Host "[2/6] Android native project already exists." -ForegroundColor Green
}


# ------------------------------------------------------------
# 3. Configure ARM64 architecture
# ------------------------------------------------------------

$GradleProperties = "android\gradle.properties"
$ArchitectureProperty = "reactNativeArchitectures=arm64-v8a"

Write-Host "[3/6] Configuring ARM64 architecture..." -ForegroundColor Yellow

if (-not (Test-Path $GradleProperties)) {
    Write-Host "ERROR: $GradleProperties not found." -ForegroundColor Red
    exit 1
}

$content = Get-Content $GradleProperties -Raw

if ($content -match "(?m)^reactNativeArchitectures=.*$") {

    $content = $content -replace `
        "(?m)^reactNativeArchitectures=.*$", `
        $ArchitectureProperty

    Set-Content `
        -Path $GradleProperties `
        -Value $content `
        -Encoding UTF8
}
else {
    Add-Content `
        -Path $GradleProperties `
        -Value "`n$ArchitectureProperty"
}

Write-Host "      ABI: arm64-v8a" -ForegroundColor Green


# ------------------------------------------------------------
# 4. Build APK
# ------------------------------------------------------------

Write-Host ""
Write-Host "[4/6] Building ARM64 debug APK..." -ForegroundColor Yellow
Write-Host ""

Push-Location android

try {
    .\gradlew.bat assembleDebug

    if ($LASTEXITCODE -ne 0) {
        throw "Gradle build failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}


# ------------------------------------------------------------
# 5. Find generated APK
# ------------------------------------------------------------

Write-Host ""
Write-Host "[5/6] Finding generated APK..." -ForegroundColor Yellow

$Apk = Get-ChildItem `
    -Path "android\app\build\outputs\apk\debug" `
    -Filter "*.apk" `
    -File `
    -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $Apk) {
    Write-Host "ERROR: APK not found." -ForegroundColor Red
    exit 1
}

Write-Host "      Found: $($Apk.FullName)" -ForegroundColor Green


# ------------------------------------------------------------
# 6. Copy APK to project root
# ------------------------------------------------------------

$PackageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$ProjectName = $PackageJson.name

if (-not $ProjectName) {
    $ProjectName = "expo-app"
}

$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$OutputName = "$ProjectName-arm64-debug-$Timestamp.apk"
$OutputPath = Join-Path (Get-Location) $OutputName

Copy-Item `
    -Path $Apk.FullName `
    -Destination $OutputPath `
    -Force

$SizeMB = [math]::Round(
    (Get-Item $OutputPath).Length / 1MB,
    2
)

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "   BUILD SUCCESSFUL" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "APK       : $OutputName" -ForegroundColor White
Write-Host "ABI       : arm64-v8a" -ForegroundColor White
Write-Host "Size      : $SizeMB MB" -ForegroundColor White
Write-Host "Location  : $OutputPath" -ForegroundColor White
Write-Host ""