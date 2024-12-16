import {input, search, } from "@inquirer/prompts";
import path from 'path';

async function promptInstanceCreation(projectBasicData) {

    const instanceDestPath = await search({
        message: "process",
        source: (term) => {

            const filteredProcesses = projectBasicData.processes.filter(e => {
                return e.processName.includes(term)
            })

            return filteredProcesses.map ( e => ({
                'name' : e.processName,
                'value' : e.path,
                'description' : e.processName
            }))
        
        }
    })

    const instanceName = await input({message: "Instance Name (only for self identification)"})

    return {
        instanceDestPath,
        instanceName
    }
}

export default promptInstanceCreation;