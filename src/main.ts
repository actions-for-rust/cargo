import { Cargo, Cross } from "@actions-for-rust/core";
import * as core from "@actions/core";
import path from "path";
import * as input from "./input";

export async function run(actionInput: input.Input): Promise<void> {
    let program;
    if (actionInput.useCross) {
        program = await Cross.getOrInstall();
    } else {
        program = await Cargo.get();
    }

    let args: string[] = [];
    if (actionInput.toolchain) {
        args.push(`+${actionInput.toolchain}`);
    }
    args.push(actionInput.command);
    args = args.concat(actionInput.args);

    await program.call(args);
}

async function main(): Promise<void> {
    const matchersPath = path.join(__dirname, ".matchers");
    console.log(`::add-matcher::${path.join(matchersPath, "rust.json")}`);

    const actionInput = input.get();

    try {
        await run(actionInput);
    } catch (error) {
        if (error instanceof Error) core.setFailed(error);
        else core.setFailed(`Unknown Error: ${error}`);
    }
}

void main();
