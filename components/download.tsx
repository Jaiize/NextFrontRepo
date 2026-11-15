"use client"
import { appToaster } from "./apptoaster";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL cannot be fetched from environment variable");
}

export async function download(url: string, filename: string, index?: number) {
    const { show, error } = appToaster();
    let id: string = ''
    // const response = await fetch(`${BASE_URL}/api/games/download/${url}`); // make [url] in backend
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Download Failed!")
        error("Download Failed!")
        return
    } 
    if (!response.body) {
        console.error("No body found in response!")
        return
    }
    
    const name = filename.replace(/[^a-zA-Z0-9.:]/g, '_') + index ? `_[${index}]` : `_${Date.now().toString()}`;
    id = show("Downloading...", 'info')

    const blob = await response.blob()
    if(typeof document !== 'undefined' && typeof window !== 'undefined'){
        const blobUrl = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = name;
        anchor.style.display = 'none'
        document.body.appendChild(anchor)
        anchor.click();

        window.URL.revokeObjectURL(blobUrl);
        anchor.remove();
        show("Downloaded", 'downloaded', id)
    }

} 

export async function downloadLarge(url: string, filename: string, onProgress?: (data: { loaded: number, total: number, percent: number }) => void ): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/games/download/${url}`); // make [url] in backend
    if (!response.ok) {
        console.error("Download Failed!")
        return
    } 
    if (!response.body) {
        console.error("No body found in response!")
        return
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = []
    let loaded = 0
    const total = Number(response.headers.get('Content-Length') || 0)

    while(true){
        const { done, value } = await reader.read();
        if (done) break

        if(value){
            chunks.push(value);
            loaded += value.length;

            onProgress?.({ loaded, 
                total, 
                percent: total ? Math.round((loaded / total) * 100) : 0
            });
        }

    }
    
    const name = filename.replace(/[^a-zA-Z0-9.]/g, '_') + `_${Date.now().toString()}`;

    const blob = new Blob(chunks as BlobPart[])
    if(typeof document !== 'undefined' && typeof window !== 'undefined'){
        const blobUrl = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = name;
        anchor.style.display = 'none'
        document.body.appendChild(anchor)
        anchor.click();

        window.URL.revokeObjectURL(blobUrl);
        anchor.remove();
    }

}