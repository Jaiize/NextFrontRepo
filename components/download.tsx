

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL cannot be fetched from environment variable");
}

export async function download(url: string, filename: string) {
    // const response = await fetch(`${BASE_URL}/api/games/download/${url}`); // make [url] in backend
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Download Failed!")
        return
    } 
    if (!response.body) {
        console.error("No body found in response!")
        return
    }
    
    const name = filename.replace(/[^a-zA-Z0-9.]/g, '_') + Date.now().toString();

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
    }

} 

export async function downloadLarge(url: string, filename: string, onProgress?: (data: { loading: number, total: number, percent: number }) => void ): Promise<void> {
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
    let loading = 0
    const total = Number(response.headers.get('Content-Length') || 0)

    while(true){
        const { done, value } = await reader.read();
        if (done) break

        if(value){
            chunks.push(value);
            loading += value.length;

            onProgress?.({ loading, 
                total, 
                percent: Math.round((loading / total) - 100)
            });
        }

    }
    
    const name = filename.replace(/[^a-zA-Z0-9.]/g, '_') + Date.now().toString();

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