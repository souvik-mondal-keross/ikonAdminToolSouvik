import {input, select, } from "@inquirer/prompts";

async function promptProjectCreation() {

    const projectName = await input({message: "Project Name"})

    return {
        projectName
    }
}

export default promptProjectCreation;