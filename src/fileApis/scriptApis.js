import { writeJsonFile, createFolder, checkPathExists, createFile, readJsonFile } from "./fileHandler.js";
import path from 'path';
import ora from "ora";
import { uuid } from "../helpers.js";

async function createScript(projectBasicData,scriptInfo){

    const scriptCreationProgress = ora('Creating new script.').start();
    const scriptFileName = `${scriptInfo.scriptName}.${scriptInfo.scriptType}.js`;
    const scriptFilePath = path.join(scriptInfo.scriptDestProcessPath,'scripts',scriptFileName);

    const processMetadataInfo = await readJsonFile(
        path.join(scriptInfo.scriptDestProcessPath,'metadata.json')
    );

    try {
        const ifScriptExists = await checkPathExists(scriptFilePath);

        if(ifScriptExists) {
            scriptCreationProgress.fail("script already exists ...");
            return;   
        }

        await createFile(scriptFilePath);

        processMetadataInfo.scripts.push({
            'scriptName': scriptInfo.scriptName,
            'scriptType' : scriptInfo.scriptType,
            'scriptPath': path.resolve(scriptFilePath),
            'id': uuid()
        })

        await writeJsonFile(
            path.join(scriptInfo.scriptDestProcessPath,'metadata.json'),
            processMetadataInfo
        )

        scriptCreationProgress.succeed("Script creation complete.");

    }
    catch(e) {
        console.error(e);
        scriptCreationProgress.fail("Failed to create script");
    }
}

export default createScript;