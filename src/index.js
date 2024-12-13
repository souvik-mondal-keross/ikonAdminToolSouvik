import createProcess from "./fileApis/processApis.js";
import promptProcessCreation from "./ui/processCreation.js";
import { createProject } from "./fileApis/projectApis.js";
import promptProjectCreation from "./ui/projectCreation.js";
import { Command } from "commander";
import path from 'path';
import { readJsonFile } from "./fileApis/fileHandler.js";

const basePath = './rough/'
const program = new Command();


async function readCurrentProjectInfo() {
    const projectInfo = readJsonFile(
        path.join(basePath,'test project','project.json')
    );

    return projectInfo;
}


// Define the `createProject` command
program
  .command('createProject')
  .description('Create a new Ikon project')
  .action(async () => {
    const projectInfo = await promptProjectCreation()
    await createProject(projectInfo,basePath);
  });

// Define the `createProcess` command
program
  .command('createProcess')
  .description('Create a new process')
  .action(async () => {
    const projectBasicData = await readCurrentProjectInfo();
    const processInfo = await promptProcessCreation(projectBasicData)

    console.log(processInfo);

    await createProcess(
        path.join(basePath,'test project'),
        projectBasicData,
        processInfo
    );
  });

program.parse(process.argv);