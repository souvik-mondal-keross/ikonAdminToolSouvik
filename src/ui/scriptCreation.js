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
            'name' : 'Process Condition',
            'value' : 'processCondition',
            'description' : 'Process Condition'
        },
        {
            'name' : 'Action Validation',
            'value' : 'actionValidation',
            'description' : 'Action Validation'
        },
        {
            'name' : 'Common Action Validation',
            'value' : 'commonActionValidation',
            'description' : 'Common Action Validation'
        },
        {
            'name' : 'Transition Action - Before Transaction',
            'value' : 'beforeTransaction',
            'description' : 'Transition Action - Before Transaction'
        },
        {
            'name' : 'Transition Action - After Transaction',
            'value' : 'afterTransaction',
            'description' : 'Transition Action - After Transaction'
        },
    ]
}

export default promptScriptCreation;