import { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemQRCodeProps {
  itemId: bigint;
}

// Simple QR code generation using a public API (no library needed)
export default function ItemQRCode({ itemId }: ItemQRCodeProps) {
  const itemUrl = `${window.location.origin}/?item=${itemId.toString()}`;
  const encodedUrl = encodeURIComponent(itemUrl);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodedUrl}&bgcolor=ffffff&color=0d7c66&margin=10`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrApiUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fluxera-item-${itemId.toString()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(qrApiUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-xl border border-border shadow-xs inline-block">
        <img
          src={qrApiUrl}
          alt={`QR Code for item ${itemId.toString()}`}
          width={180}
          height={180}
          className="block"
          loading="lazy"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px] break-all">
        Item ID: {itemId.toString()}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="gap-1.5 text-xs"
      >
        <Download className="w-3.5 h-3.5" />
        Download QR
      </Button>
    </div>
  );
}
