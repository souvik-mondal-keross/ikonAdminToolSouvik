import { writeJsonFile, createFolder, checkPathExists, createFile, readJsonFile } from "./fileHandler.js";
import path from 'path';
import ora from "ora";
import { uuid } from "../helpers.js";

async function createInstance(projectBasicData,instanceInfo) {

    const instanceCreationProgress = ora('Creating new script.').start();

    try {

        const instanceFolderPath = path.join(instanceInfo.instanceDestPath,'instances',instanceInfo.instanceName);
        const isInstanceExists = await checkPathExists(instanceFolderPath);

        if(isInstanceExists) {
            instanceCreationProgress.fail("Instance with this name already exists");
            return;
        }

        await createFolder(
            instanceFolderPath,
            false
        );

        await createFile(
            path.join(instanceFolderPath,'extract.js'),
            getBasicExtractJsContent()
        )
        
        instanceCreationProgress.succeed("Process instance created.");
    }
    catch(e) {
        console.error(e);
        instanceCreationProgress.fail("Failed to create instance");
    }

}

function getBasicExtractJsContent() {
    return `
        export default {
            // return your instance object here
        }
    `
}

export  {createInstance};