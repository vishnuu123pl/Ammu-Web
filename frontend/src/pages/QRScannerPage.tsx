import { useQRScanner } from '@/qr-code/useQRScanner';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  CameraOff,
  FlipHorizontal,
  Trash2,
  QrCode,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default function QRScannerPage() {
  const {
    qrResults,
    isScanning,
    isActive,
    isSupported,
    error,
    isLoading,
    canStartScanning,
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    videoRef,
    canvasRef,
  } = useQRScanner({
    facingMode: 'environment',
    scanInterval: 150,
    maxResults: 10,
  });

  const [invalidQR, setInvalidQR] = useState<string | null>(null);

  // Parse scanned QR codes
  useEffect(() => {
    if (qrResults.length === 0) return;
    const latest = qrResults[0];
    const data = latest.data;

    // Try to parse as FLUxera item URL
    try {
      const url = new URL(data);
      const itemId = url.searchParams.get('item');
      if (itemId && !isNaN(Number(itemId))) {
        toast.success(`Item #${itemId} found! Navigate to Borrow page to view.`);
        setInvalidQR(null);
        return;
      }
    } catch {
      // Not a URL
    }

    // Check if it's just a number (item ID)
    if (/^\d+$/.test(data.trim())) {
      toast.success(`Item #${data.trim()} scanned! Navigate to Borrow page to view.`);
      setInvalidQR(null);
      return;
    }

    setInvalidQR(data);
  }, [qrResults]);

  if (isSupported === false) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <CameraOff className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-display font-bold">Camera Not Supported</h2>
          <p className="text-muted-foreground">Your browser doesn't support camera access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="section-title mb-2">QR Scanner</h1>
        <p className="text-muted-foreground">Scan item QR codes to quickly find and borrow items</p>
      </div>

      {/* Camera Preview */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card mb-4">
        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            style={{ display: isActive ? 'block' : 'none' }}
          />
          <canvas ref={canvasRef} className="hidden" />

          {!isActive && (
            <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">Camera preview will appear here</p>
            </div>
          )}

          {isActive && isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 border-2 border-primary rounded-xl opacity-80">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                </div>
              </div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <Badge className="bg-primary/90 text-primary-foreground gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Scanning...
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-4 py-3 bg-destructive/10 border-t border-destructive/20 flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error.message}
          </div>
        )}

        {/* Controls */}
        <div className="p-4 flex items-center gap-2 flex-wrap">
          {!isActive ? (
            <Button
              onClick={startScanning}
              disabled={!canStartScanning || isLoading}
              className="bg-primary text-primary-foreground gap-2 flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Start Scanning
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={stopScanning}
              variant="outline"
              disabled={isLoading}
              className="gap-2 flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <CameraOff className="w-4 h-4" />
              Stop
            </Button>
          )}

          {isMobile && isActive && (
            <Button
              variant="outline"
              onClick={switchCamera}
              disabled={isLoading}
              className="gap-2"
            >
              <FlipHorizontal className="w-4 h-4" />
              Flip
            </Button>
          )}
        </div>
      </div>

      {/* Invalid QR Warning */}
      {invalidQR && (
        <div className="bg-secondary/20 border border-secondary/30 rounded-xl p-4 flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-secondary-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-secondary-foreground">Unrecognized QR Code</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-all">"{invalidQR}"</p>
            <p className="text-xs text-muted-foreground mt-1">This QR code is not a FLUxera item code.</p>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {qrResults.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">Scan Results</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearResults}
              className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </Button>
          </div>

          <div className="space-y-2">
            {qrResults.map((result, i) => {
              let itemId: string | null = null;
              try {
                const url = new URL(result.data);
                itemId = url.searchParams.get('item');
              } catch {
                if (/^\d+$/.test(result.data.trim())) {
                  itemId = result.data.trim();
                }
              }

              return (
                <div key={result.timestamp} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  {itemId ? (
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-secondary-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">
                      {itemId ? `FLUxera Item #${itemId}` : 'Unknown QR Code'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{result.data}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {i === 0 && (
                    <Badge variant="secondary" className="text-xs shrink-0">Latest</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
