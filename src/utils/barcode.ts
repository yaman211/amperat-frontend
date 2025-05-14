import { useQuasar } from 'quasar';
import { onUnmounted } from 'vue';

export const useScanBarcode = () => {
  const q = useQuasar();
  const BarcodeScanner = q.capacitor.Plugins.BarcodeScanner;

  const startScan = async (): Promise<string | undefined> => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      return result.content;
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  onUnmounted(() => {
    stopScan();
  });

  return {
    startScan,
    stopScan,
  };
};

export const isValidClockCode = (code: string | undefined) => {
  console.log({
    code,
  });
  if (!code) {
    return false;
  }
  if (code.startsWith('AMP-')) {
    const id = +code.split('-')[1];
    if (!id) return false;
    return true;
  } else {
    return false;
  }
};

export const getIdFromCode = (code: string) => {
  const id = +code.split('-')[1];
  return id;
};
