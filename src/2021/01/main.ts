import { Logger, parseInput } from "../../utils";

export async function main() {
    const logger = new Logger(new Date("2021/12/01"));
    logger.start();

    const input = await getFormattedInput();
    answerFirstProblem(input);
    answerSecondProblem(input);


    async function getFormattedInput() {
        const parsedInput = await parseInput(`${__dirname}/input.txt`);
        const inputNumbers = parsedInput.map(entry => Number.parseInt(entry));
        return inputNumbers;
    }

    function answerFirstProblem(depths: number[]) {
        let increaseCounter = 0;
        depths.reduce((previous, current) => {
            if (current > previous) increaseCounter++;
            return current;
        }, Number.POSITIVE_INFINITY);

        logger.answer("First problem: {result} measurements are larger than the previous measurements.", increaseCounter);
    }
    function answerSecondProblem(depths: number[]) {
        let increaseCounter = 0;
        let previousSum = Number.POSITIVE_INFINITY;

        for (let i = 0; i < depths.length - 2; i++) {
            const currentSum = depths[i] + depths[i+1] + depths[i+2];
            if (currentSum > previousSum) increaseCounter++;

            previousSum = currentSum;
        }

        logger.answer("Second problem: There are {result} sums that are larger than the previous sum.", increaseCounter);
    }
}
