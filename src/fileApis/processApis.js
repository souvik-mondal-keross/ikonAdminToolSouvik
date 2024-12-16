import ora from "ora";
import { checkPathExists, createFolder, createFile, writeJsonFile, readJsonFile } from "./fileHandler.js";
import path from 'path';

async function createProcess(rootDirPath,projectBasicData,processInfo) {

    const rootProjDirPath = path.join(rootDirPath)
    const processCreationProgress = ora('Creating new process.').start();

    try {

        const processFolderPath = path.join(processInfo.parentProcess.path,processInfo.processName);
        const isProcessExisting = await checkPathExists(processFolderPath);
    

        if(isProcessExisting){
            console.error("Process already exists ...");
            processCreationProgress.fail("Failed to create process.");
            return;
        }
    
        await createFolder(processFolderPath);
        await writeJsonFile(
            path.join(processFolderPath,'/metadata.json'),
            getBaseProcessMetadata(processInfo),
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
        
        await createFolder(
            path.join(processFolderPath,'instances'),
            false
        );
        
        projectBasicData.processes.push({
            'processName' : processInfo.processName,
            'path' : processFolderPath
        })
        
        await writeJsonFile(
            path.join(rootDirPath,'project.json'),
            projectBasicData
        )

        processCreationProgress.succeed("Successfully created new process.");
        
    }
    catch(err) {
        console.error(err);
        processCreationProgress.fail("Failed to create process.");
    }
}

function getBaseProcessMetadata(processInfo) {
    return {
        ...processInfo,
        'scripts': [],
        'processVariableFields': []
    }
}


export default createProcess;