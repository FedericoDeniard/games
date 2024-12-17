const AvailableColours: { [key: number]: { normal: string, active: string } } = {
    1: { normal: "#ff8080", active: "#ff3333" }, // pastel red / pressed red
    2: { normal: "#80ff80", active: "#33cc33" }, // pastel green / pressed green
    3: { normal: "#8080ff", active: "#3333ff" }, // pastel blue / pressed blue
    4: { normal: "#ffff80", active: "#cccc33" }  // pastel yellow / pressed yellow
};


export type Colour = 1 | 2 | 3 | 4;

export class Simon {
    private sequence: Colour[] = [];
    private playerSequence: Colour[] = [];
    private currentColorShowed: Colour | undefined = undefined;

    constructor() { }

    private getNextColour(): Colour {
        return Math.floor(Math.random() * 4) + 1 as Colour;
    }

    public startGame(): void {

    }

    public extendSequence(): void {
        this.sequence.push(this.getNextColour())
    }

    public getCurrentColorShowed(): Colour | undefined {
        return this.currentColorShowed
    }

    public getSequence(): Colour[] {
        return this.sequence
    }
}