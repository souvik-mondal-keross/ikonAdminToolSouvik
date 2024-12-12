import {input, select, } from "@inquirer/prompts";

async function promptProcessCreation() {

    const processName = await input({message: "Process Name"})
    
    const parentProcess = await select({
        message: "Parent Process",
        choices: [
            {
                name: 'None',
                value: null,
                description: 'It does not have a parent process.',
            },
        ]
    })

    const isLockRequired = await select({
        message: "Lock Required ? ",
        choices: [
            {
                name: 'Yes',
                value: true,
                description: 'Lock needed for updating instances.',
            },
            {
                name: 'No',
                value: false,
                description: 'Lock not needed for updating instances.',
            },
        ]
    })
    
    const isSharedProcess = await select({
        message: "Shared Process ? ",
        choices: [
            {
                name: 'Yes',
                value: true,
                description: 'Process Instance will be shared.',
            },
            {
                name: 'No',
                value: false,
                description: 'Process instances will not be shared.',
            },
        ]
    })

    return {
        processName,
        parentProcess,
        isLockRequired,
        isSharedProcess
    }
}

export default promptProcessCreation;