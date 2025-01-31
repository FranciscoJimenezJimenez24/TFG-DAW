export class ServerStorage implements Storage {
    private data: { [key: string]: string } = {};

    get length(): number {
        return Object.keys(this.data).length;
    }

    clear(): void {
        this.data = {};
    }

    getItem(key: string): string | null {
        return this.data[key] || null;
    }

    key(index: number): string | null {
        return Object.keys(this.data)[index] || null;
    }

    removeItem(key: string): void {
        delete this.data[key];
    }

    setItem(key: string, value: string): void {
        this.data[key] = value;
    }
}
