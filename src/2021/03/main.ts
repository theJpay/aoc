import { Logger, parseInput } from "../../utils";

type Binary = ("0" | "1")[]

export async function main() {
    const logger = new Logger(new Date("2021/12/03"));
    logger.start();

    const input = await getFormattedInput();
    answerFirstProblem(input);
    answerSecondProblem(input);


    async function getFormattedInput() {
        const parsedInput = await parseInput(`${__dirname}/input.txt`);
        return parsedInput.map(entry => entry.split("")) as unknown as Binary[];
    }

    function answerFirstProblem(binaries: Binary[]) {
        const binaryLength = binaries[0].length;
        let binaryGammaRate = "";
        let binaryEpsilonRate = "";

        for (let i = 0; i < binaryLength; i++) {
            const mostCommonBit = computeMostCommonBit(i);
            binaryGammaRate += mostCommonBit;
            binaryEpsilonRate += mostCommonBit === "0" ? "1" : "0";
        }


        const gamma = Number.parseInt(binaryGammaRate, 2);
        const epsilon = Number.parseInt(binaryEpsilonRate, 2);

        logger.newLine();
        logger.log("First problem:");
        logger.log(`Binary Gamma Rate: ${binaryGammaRate} - ${gamma}`);
        logger.log(`Binary Epsilon Rate: ${binaryEpsilonRate} - ${epsilon}`);
        logger.answer("The power consumption of the submarine is {result}", gamma * epsilon);

        function computeMostCommonBit(index: number) {
            const counters = { 0: 0, 1: 0 };
            binaries.forEach(binary => {
                if (binary[index] === "0") counters[0]++;
                if (binary[index] === "1") counters[1]++;
            });
            return counters[0] > counters[1] ? "0" : "1";
        }
    }
    function answerSecondProblem(binaries: Binary[]) {
        const binaryLength = binaries[0].length;

        const binaryOxygen = recursivelyFindCandidate(binaries, 0, { candidateFinder: computeMostCommonBit });
        const binaryCO2 = recursivelyFindCandidate(binaries, 0, { candidateFinder: computeLeastCommonBit });
        // const binaryCO2 = "0";


        const oxygen = Number.parseInt(binaryOxygen, 2);
        const co2 = Number.parseInt(binaryCO2, 2);

        logger.newLine();
        logger.log("Second problem:");
        logger.log(`Oxygen generator rating: ${binaryOxygen} - ${oxygen}`);
        logger.log(`CO2 scrubber rating: ${binaryCO2} - ${co2}`);
        logger.answer("The life support rating of the submarine is {result}", oxygen * co2);

        function recursivelyFindCandidate(filteredBinaries: Binary[], index: number, { candidateFinder }: { candidateFinder: (filteredBinaries: Binary[], index: number) => "0" | "1" }): string {
            if (filteredBinaries.length === 1) return filteredBinaries[0].join("");
            if (filteredBinaries.length === 0) throw new Error("Fail.");
            if (index >= binaryLength) throw new Error("Fail.");

            const candidate = candidateFinder(filteredBinaries, index);
            const newBinaries = filteredBinaries.filter(binary => binary[index] === candidate);
            return recursivelyFindCandidate(newBinaries, ++index, { candidateFinder });
        }
        function computeMostCommonBit(filteredBinaries: Binary[], index: number) {
            const counters = { 0: 0, 1: 0 };
            filteredBinaries.forEach(binary => {
                if (binary[index] === "0") counters[0]++;
                if (binary[index] === "1") counters[1]++;
            });
            return counters[0] > counters[1] ? "0" : "1";
        }
        function computeLeastCommonBit(filteredBinaries: Binary[], index: number) {
            const counters = { 0: 0, 1: 0 };
            filteredBinaries.forEach(binary => {
                if (binary[index] === "0") counters[0]++;
                if (binary[index] === "1") counters[1]++;
            });
            return counters[0] <= counters[1] ? "0" : "1";
        }
    }
}
