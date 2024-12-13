import ora from "ora";
import { checkPathExists, createFolder, createFile, writeJsonFile } from "./fileHandler.js";
import path from 'path';

async function createProcess(rootDirPath,processInfo) {

    const processCreationProgress = ora('Creating new process.').start();

    try {

        const processFolderPath = path.join(rootDirPath,processInfo.processName);
        const isProcessExisting = await checkPathExists(processFolderPath);
    

        if(isProcessExisting){
            console.error("Process already exists ...");
            processCreationProgress.fail("Failed to create process.");
            return;
        }
    
        await createFolder(processFolderPath);
        await writeJsonFile(
            path.join(processFolderPath,'/metadata.json'),
            processInfo
        );
        await writeJsonFile(
            path.join(processFolderPath,'/process_model.json'),
            {}
        );
        
        
        await createFolder(
            path.join(processFolderPath,'scripts'),
            false
        );

        await createFolder(
            path.join(processFolderPath,'children'),
            false
        );

        processCreationProgress.succeed("Successfully created new process.");
        
    }
    catch(err) {
        console.error(err);
        processCreationProgress.fail("Failed to create process.");
    }

}


export default createProcess;