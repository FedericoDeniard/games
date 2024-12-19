import { Record } from "../../components/records/Record";

export const AvailableColours: { [key: number]: { normal: string, active: string } } = {
    1: { normal: "#ff8080", active: "#ff3333" }, // pastel red / pressed red
    2: { normal: "#80ff80", active: "#33cc33" }, // pastel green / pressed green
    3: { normal: "#8080ff", active: "#3333ff" }, // pastel blue / pressed blue
    4: { normal: "#ffff80", active: "#cccc33" }  // pastel yellow / pressed yellow
};


export type Colour = 1 | 2 | 3 | 4;

export class Simon {
    private sequence: Colour[] = [];
    private playerSequence: Colour[] = [];
    private lost: boolean = false
    private recordHandler: Record = new Record("Simon")

    constructor() { }

    private getNextColour(): Colour {
        return Math.floor(Math.random() * 4) + 1 as Colour;
    }

    public startGame(): void {
        this.lost = false
        this.playerSequence = []
        this.sequence = []
        this.extendSequence()
    }

    public extendSequence(): void {
        this.playerSequence = []
        this.sequence.push(this.getNextColour())
    }

    public makePlayerMove(buttonPressed: Colour): boolean {
        let completed = false
        if (!this.lost) {
            this.playerSequence.push(buttonPressed);
            const succesfull = this.checkSequence();
            if (!succesfull) {
                this.lost = true
            }
            else if (succesfull && JSON.stringify(this.playerSequence) === JSON.stringify(this.sequence)) {
                completed = true
                let lastRecord = this.recordHandler.getRecord();
                let actualRecord = this.playerSequence.length
                this.extendSequence()
                if (lastRecord === null || actualRecord > lastRecord) {
                    this.recordHandler.saveRecord(actualRecord)
                }
            }
        }
        return completed
    }


    public getSequence(): Colour[] {
        return this.sequence
    }

    public getLost(): boolean {
        return this.lost
    }

    public checkSequence(): boolean {
        const lastButtonPressed = this.playerSequence[this.playerSequence.length - 1];
        return lastButtonPressed === this.sequence[this.playerSequence.length - 1];
    }

    public getRecord(): number | null {
        return this.recordHandler.getRecord()
    }
}