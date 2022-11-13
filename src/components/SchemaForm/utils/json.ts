export function parseJSON(data: any) {
    if (typeof data === 'object') return data;

    try {
        return JSON.parse(data)
    } catch {
        return data;
    }
}

export function toJSON(data: any) {
    if (typeof data === 'string') return data;

    return JSON.stringify(data);
}