import chalk from "chalk";

const DARK_BLUE = "#0f0f23";
const NEON_GREEN = "#009900";
const STARRY_YELLOW = "#ffff66";
const GREY = "#cccccc";
const WHITE = "#ffffff";

export class Logger {
    private customChalk: chalk.Chalk;

    constructor(private date: Date) {
        this.customChalk = chalk.bgHex(DARK_BLUE);
    }

    log(...args: unknown[]) {
        console.log(this.customChalk.hex(GREY)(...args));
    }
    newLine() {
        console.log();
    }
    start() {
        console.log(this.customChalk.hex(NEON_GREEN)(`Here are the answers for ${this.date.toDateString()}`));
        this.newLine();
    }
    answer(sentence: string, answer: unknown) {
        const [part1, part2] = sentence.split("{result}");
        console.log(this.customChalk.hex(WHITE)(part1 + this.customChalk.hex(STARRY_YELLOW)(answer) + part2));
    }
}
