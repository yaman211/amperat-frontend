#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Path configurations
PROJECT_ROOT="D:/Front-End/Amperat/amperat-frontend-v2"
SDK_PATH="C:/Users/Yaman/AppData/Local/Android/Sdk/build-tools/34.0.0"
KEYSTORE_PATH="D:/Front-End/Amperat/keys/my-release-key.keystore"
KEY_PASSWORD="53227682000Ab@"
SERVER_PATH="root@72.61.178.48:/var/www/cdn.amperat.cloud/apks/admin/"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Ask for version
read -p "Enter the new version (e.g., v0.0.2): " VERSION

# Validate version format
if [[ ! $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "Invalid version format. Please use format like: v0.0.1, v1.2.3"
    exit 1
fi

# Create version directory
VERSION_DIR="$PROJECT_ROOT/releases/admin/$VERSION"
print_info "Creating version directory: $VERSION_DIR"
mkdir -p "$VERSION_DIR"

# Step 1: Build the mobile app
print_info "Step 1: Building mobile app..."
cd "$PROJECT_ROOT" || exit 1

if npm run build-mobile; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Step 2: Copy APK to releases folder
print_info "Step 2: Copying APK to releases folder..."
SRC_APK="$PROJECT_ROOT/dist/capacitor/android/apk/release/app-release-unsigned.apk"
DEST_APK="$VERSION_DIR/app-release-unsigned.apk"

if cp "$SRC_APK" "$DEST_APK"; then
    print_success "APK copied to $DEST_APK"
else
    print_error "Failed to copy APK"
    exit 1
fi

# Step 3: Zipalign
print_info "Step 3: Running zipalign..."
ZIPALIGNED_APK="$VERSION_DIR/app-release-zipaligned-unsigned.apk"

if "$SDK_PATH/zipalign" -v 4 "$DEST_APK" "$ZIPALIGNED_APK"; then
    print_success "Zipalign completed successfully"
else
    print_error "Zipalign failed"
    exit 1
fi

# Step 4: Sign APK
print_info "Step 4: Signing APK..."
SIGNED_APK="$VERSION_DIR/app-release.apk"

# Create a temporary file for the password
PASSWORD_FILE="./temp_keystore_password.txt"
echo "$KEY_PASSWORD" > "$PASSWORD_FILE"

if "$SDK_PATH/apksigner.bat" sign --ks "$KEYSTORE_PATH" --ks-pass "file:$PASSWORD_FILE" --out "$SIGNED_APK" "$ZIPALIGNED_APK"; then
    print_success "APK signed successfully"
    # Clean up password file
    rm -f "$PASSWORD_FILE"
else
    print_error "APK signing failed"
    rm -f "$PASSWORD_FILE"
    exit 1
fi

# Step 5: Upload to server
print_info "Step 5: Uploading to server..."
UPLOAD_APK_NAME="app-$VERSION.apk"

# Copy the signed APK with version name for upload
cp "$SIGNED_APK" "$VERSION_DIR/$UPLOAD_APK_NAME"

if scp "$VERSION_DIR/$UPLOAD_APK_NAME" "$SERVER_PATH"; then
    print_success "APK uploaded to server successfully"
else
    print_error "Failed to upload APK to server"
    exit 1
fi

# Summary
print_success "Build and deployment completed!"
print_info "Version: $VERSION"
print_info "Local APK: $SIGNED_APK"
print_info "Uploaded as: $UPLOAD_APK_NAME"
print_info "App Path: $SERVER_PATH/$UPLOAD_APK_NAME"