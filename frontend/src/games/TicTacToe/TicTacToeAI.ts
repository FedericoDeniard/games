import { TicTacToe, TicTacToeProps } from ".";

export class TicTacToeVersusAI extends TicTacToe {
    private currentPlayer: string;
    private ai: string = "X"
    private human: string = "O"

    public constructor(props: TicTacToeProps) {
        super(props);
        this.currentPlayer = this.human;

    }

    public makeMove(index: number): boolean {
        let madeMove = false;
        let board = this.getBoard();
        let won = this.getWon();

        if (board[index] === "" && won.every((value) => value === null)) {
            board[index] = this.currentPlayer;
            madeMove = true;

            let gameOver = this.checkWin(board)
            if (gameOver) {
                let whoWon = this.countTurn(board) % 2 === 0 ? "X" : "O";
                console.log(`Gano: ${whoWon}`);
                return madeMove;
            }
            this.switchPlayer();
            if (this.currentPlayer === this.ai) {
                this.makeAIMove()
            }
        }
        return madeMove
    }

    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === this.human ? this.ai : this.human;
    }

    private makeAIMove(): void {
        let bestMovement = this.bestMove();
        let board = this.getBoard();
        board[bestMovement] = this.ai;
        let gameOver = this.checkWin(board)
        if (gameOver) {
            console.log("Gano: ", this.currentPlayer)
        } else {
            this.switchPlayer()
        }

    }

    private bestMove(): number {
        let currentBoard = this.getBoard()
        let bestScore = -Infinity
        let bestMovement: number = -1;

        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = this.ai;
                let score = this.minimax(currentBoard, 0, false)
                currentBoard[i] = "";
                if (score > bestScore) {
                    bestScore = score
                    bestMovement = i
                }
            }
        }
        return bestMovement
    }

    private minimax(board: string[], depth: number, isMaximizing: boolean): number {
        const winner = this.checkWinner(board)
        if (winner !== null) {
            return this.scores(winner)
        }
        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = this.ai;
                    let score = this.minimax(board, depth + 1, false)
                    board[i] = "";
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = this.human;
                    let score = this.minimax(board, depth + 1, true)
                    board[i] = "";
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore;
        }
    }

    private checkWinner(board: string[]): string | null {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        let winner: string | null = null;
        let i = 0;

        while (i < lines.length && winner === null) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a];
            }
            i++;
        }

        if (winner === null && board.every(cell => cell !== "")) {
            winner = "tie";
        }

        return winner;
    }


    private scores(result: string): number {
        if (result === "X") return 10;
        if (result === "O") return -10;
        return 0;
    }

    public reset(): void {
        super.reset()
        console.log("Reseteando")
        this.currentPlayer = this.human
    }
}