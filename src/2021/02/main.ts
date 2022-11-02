import { Logger, parseInput } from "../../utils";

type Move = "down" | "forward" | "up";
type FormattedInput = {
    move: Move;
    value: number;
}

export async function main() {
    const logger = new Logger(new Date("2021/12/02"));
    logger.start();

    const input = await getFormattedInput();
    answerFirstProblem(input);
    answerSecondProblem(input);


    async function getFormattedInput() {
        const parsedInput = await parseInput(`${__dirname}/input.txt`);
        const inputNumbers = parsedInput.map((entry: string) => {
            const [move, value] = entry.split(" ");
            return {
                move,
                value: Number.parseInt(value)
            };
        });
        return inputNumbers as FormattedInput[];
    }

    function answerFirstProblem(commands: FormattedInput[]) {
        let horizontal = 0;
        let depth = 0;

        commands.forEach(command => {
            if (command.move === "forward") horizontal += command.value;
            if (command.move === "up") depth -= command.value;
            if (command.move === "down") depth += command.value;
        });

        logger.newLine();
        logger.log("First problem:");
        logger.log(`Horizontal position: ${horizontal}`);
        logger.log(`Depth: ${depth}`);
        logger.answer("If you multiply your final horizontal position by your final depth, you get {result}", horizontal * depth);
    }
    function answerSecondProblem(commands: FormattedInput[]) {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;

        commands.forEach(command => {
            if (command.move === "up") aim -= command.value;
            if (command.move === "down") aim += command.value;
            if (command.move === "forward") {
                horizontal += command.value;
                depth += aim * command.value;
            }
        });

        logger.newLine();
        logger.log("Second problem:");
        logger.log(`Horizontal position: ${horizontal}`);
        logger.log(`Depth: ${depth}`);
        logger.answer("If you multiply your final horizontal position by your final depth, you get {result}", horizontal * depth);
    }
}
