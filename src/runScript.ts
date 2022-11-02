import yargs from "yargs";
import { hideBin } from "yargs/helpers";

runScript();
async function runScript() {
    const { day, year } = await parseArgs();
    await run(day, year);
}

async function parseArgs() {
    const { day, year } = await yargs(hideBin(process.argv))
        .option("day", {
            alias: "d",
            demandOption: true,
            describe: "Day of the AOC you want the result of.",
            type: "string"
        })
        .option("year", {
            alias: "y",
            demandOption: true,
            describe: "Year of the AOC you want the result of.",
            type: "string"
        })
        .help()
        .example([
            ["yarn run -y 2021 -d 01"]
        ])
        .locale("en")
        .version(false)
        .epilog("Made By Jules Paris")
        .argv;
    return { day, year };
}

async function run(day = "01", year = "2021") {
    try {
        const { main } = await import(`${__dirname}/${year}/${day}/main`);
        main();
    } catch (error) {
        // @ts-expect-error Code actually exist in that case
        if (error instanceof Error && error.code === "MODULE_NOT_FOUND") {
            console.error("Wrong parameters. Code not written for this date.");
            return;
        }
        throw error;
    }
}
