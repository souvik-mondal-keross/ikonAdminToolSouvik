import {input, select, } from "@inquirer/prompts";
import path from 'path';

async function promptProcessCreation(projectBasicData) {

    const parentProcessesOptions = projectBasicData.processes.map(e => ({
        name: e.processName,
        value: {
            'parent': e.processName, 
            'path': path.join(e.path,'children')
        },
        description: e.processName,
    }))

    const processName = await input({message: "Process Name"})

    const parentProcess = await select({
        message: "Parent Process",
        choices: [
            {
                name: 'None',
                value: {
                    'parent': null, 
                    'path': path.join(projectBasicData.projectPath,'src')
                },
                description: 'It does not have a parent process.',
            },

            ...parentProcessesOptions
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