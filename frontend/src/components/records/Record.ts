export class Record {
    private record: number;
    private gameName: string;

    public constructor(gameName: string) {
        this.gameName = gameName
        try {
            let record = Number(localStorage.getItem(gameName))
            if (typeof record === 'number') {
                this.record = record
            } else {
                this.record = 0;
            }

        }
        catch (e) {
            console.log(e)
            this.record = 0
        }
    }

    public getRecordName(): string {
        return this.gameName
    }

    public getRecord(): number | null {
        return this.record
    }

    public saveRecord(newRecord: number): void {
        this.record = newRecord
        localStorage.setItem(this.gameName, newRecord.toString())
    }
}