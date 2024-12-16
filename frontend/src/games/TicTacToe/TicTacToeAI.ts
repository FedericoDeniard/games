import { Players, TicTacToe, TicTacToeProps } from ".";

export class TicTacToeVersusAI extends TicTacToe {
    private ai: Players = "X"
    private human: Players = "O"

    public constructor(props: TicTacToeProps) {
        super(props);
        this.setCurrentPlayer(this.human);

    }

    public makeMove(index: number): boolean {
        let madeMove = false;
        let board = this.getBoard();
        let won = this.getWon();

        if (board[index] === "" && won.every((value) => value === null)) {
            board[index] = this.getCurrentPlayer();
            madeMove = true;

            let gameOver = this.checkFinished(board)
            if (gameOver) {
                let whoWon = this.countTurn(board) % 2 === 0 ? "X" : "O";
                console.log(`Gano: ${whoWon}`);
                return madeMove;
            }
            this.switchPlayer();
            if (this.getCurrentPlayer() === this.ai) {
                this.makeAIMove()
            }
        }
        return madeMove
    }

    private makeAIMove(): void {
        let bestMovement = this.bestMove();
        let board = this.getBoard();
        board[bestMovement] = this.ai;
        let gameOver = this.checkFinished(board)
        if (gameOver) {
            console.log("Gano: ", this.getCurrentPlayer())
        } else {
            this.switchPlayer()
        }

    }

    private bestMove(): number {
        let currentBoard = [...this.getBoard()]
        let bestScore = -Infinity
        let bestMovement: number = -1;

        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = this.ai;
                let score = this.minimax(currentBoard, 0, false)
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
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore;
        }
    }

    private scores(result: string): number {
        if (result === "X") return 10;
        if (result === "O") return -10;
        return 0;
    }

    public reset(): void {
        super.reset()
        console.log("Reseteando")
        this.setCurrentPlayer(this.human)
    }
}