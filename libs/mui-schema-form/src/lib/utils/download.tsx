export function download(
    data: any,
    fileName = 'filename',
    mimeType = 'text/plain'
) {
    const element = document.createElement('a');
    const file = { data, mimeType };

    if (typeof data !== 'string') {
        file.data = JSON.stringify(data, null, 2);
        file.mimeType = 'application/json';
    }

    element.setAttribute('href', `data:${file.mimeType};charset=utf-8,` + encodeURIComponent(file.data));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
