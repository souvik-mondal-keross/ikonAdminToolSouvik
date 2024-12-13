import { writeJsonFile, createFolder, checkPathExists } from "./fileHandler.js";
import path from 'path';
import ora from "ora";


async function createProject(projectInfo,projectRootDir) {

    console.log(projectInfo,projectRootDir);

    const projectCreationProgress = ora('Creating new project.').start();

    try {

        const projectFolderPath = path.join(projectRootDir,projectInfo.projectName);
        const isProjectExisting= await checkPathExists(projectFolderPath);

        if(isProjectExisting){
            projectCreationProgress.fail("Project already exists.");
        }

        await createFolder(projectFolderPath);
        
        await writeJsonFile(
            path.join(projectFolderPath,'project.json'),
            generateProjectJSON(projectInfo)
        )

        await writeJsonFile(
            path.join(projectFolderPath,'package.json'),
            geneateProjectPackageJson(projectInfo)
        )

        await createFolder(
            path.join(projectFolderPath,'src'),
            false
        )

        await createFolder(projectFolderPath);
        
        projectCreationProgress.succeed("Project creation successful");
    }
    catch(e) {
        console.error(e);
        projectCreationProgress.fail("Failed to create new project folder.");
    }

}


function generateProjectJSON(projectInfo) {
    return {
        'projectName': projectInfo.projectName,
        'processes' : [],
    }
}

function geneateProjectPackageJson(projectInfo) {
    return {
        "name": projectInfo.projectName,
        "version": "1.0.0",
        "main": "./src/index.js",
        "type": "module",
        "scripts": {
          "start": "node ./src/index.js"
        },
        "author": "",
        "license": "ISC",
        "description": "",
        "dependencies": {
        }
    }
}

export {
    createProject
}