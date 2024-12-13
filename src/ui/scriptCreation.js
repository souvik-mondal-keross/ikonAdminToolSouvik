import {input, select, search } from "@inquirer/prompts";
import path from 'path';

async function promptScriptCreation(projectBasicData) {


    const scriptDestProcessPath = await search({
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

    const scriptName = await input({
        message: 'script name'
    })

    const scriptType = await select({
        'message': "script type",
        'choices': getScriptTypes()
    })

    return {
        scriptDestProcessPath,
        scriptName,
        scriptType
    }
}

function getScriptTypes() {
    return [
        {
            'name' : 'test1',
            'value' : 'test1',
            'description' : 'test1'
        },
        {
            'name' : 'test2',
            'value' : 'test2',
            'description' : 'test2'
        },
    ]
}

export default promptScriptCreation;