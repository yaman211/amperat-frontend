### To Generate a new key (I generate one already).

`keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 20000`

### 1- Run this command inside the project root folder.

`npm run build-mobile`

### 2- Copy the release apk file from dist folder to the releases folder and put it in his version folder.

## 3- Run this command

`./zipalign -v 4 D:/Front-End/Amperat/releases/<version>/app-release-unsigned.apk D:/Front-End/Amperat/releases/<version>/app-release-zipaligned-unsigned.apk`

You can find the zipalign tool in the sdk folder in this path:
C:\Users\Yaman\AppData\Local\Android\Sdk\build-tools\34.0.0

example:
`C:/Users/Yaman/AppData/Local/Android/Sdk/build-tools/34.0.0/zipalign -v 4 D:/Front-End/Amperat/releases/v0.0.1/app-release-unsigned.apk D:/Front-End/Amperat/releases/v0.0.1/app-release-zipaligned-unsigned.apk`

### 4- Run this command to sign the apk

`./apksigner.bat sign --ks D:/Front-End/Amperat/keys/my-release-key.keystore --out D:/Front-End/Amperat/releases/<version>/app-release.apk  D:/Front-End/Amperat/releases/<version>/app-release-zipaligned-unsigned.apk`

It will ask for the password of the key, It is "532**\*\*\*\***A\*@".

example:
`C:/Users/Yaman/AppData/Local/Android/Sdk/build-tools/34.0.0/apksigner.bat sign --ks D:/Front-End/Amperat/keys/my-release-key.keystore --out D:/Front-End/Amperat/releases/v0.0.1/app-release.apk D:/Front-End/Amperat/releases/v0.0.1/app-release-zipaligned-unsigned.apk`

# Notes:

### I downgrade the app to capacitor v6.

### We use Java 17 ( I forced it to use ).

The dependencies of the src-capacitor package.json is:

```
  "dependencies": {
    "@capacitor-community/barcode-scanner": "^4.0.1",
    "@capacitor/app": "^6.0.0",
    "@capacitor/android": "^6.0.0",
    "@capacitor/cli": "^6.0.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/push-notifications": "^6.0.0"
  }
```
