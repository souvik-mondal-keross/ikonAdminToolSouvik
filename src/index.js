#!/usr/bin/env node

import createProcess from "./fileApis/processApis.js";
import promptProcessCreation from "./ui/processCreation.js";
import { createProject } from "./fileApis/projectApis.js";
import promptProjectCreation from "./ui/projectCreation.js";
import { Command } from "commander";
import path from 'path';
import { readJsonFile } from "./fileApis/fileHandler.js";
import promptScriptCreation from "./ui/scriptCreation.js"
import createScript from "./fileApis/scriptApis.js";
import promptInstanceCreation from "./ui/instanceCreation.js";
import { createInstance } from "./fileApis/instanceApis.js";

const basePath = './'
const program = new Command();


async function readCurrentProjectInfo() {

    try{
        const projectInfo = await readJsonFile(
          path.join(basePath,'project.json')
      );

      return projectInfo;
    }
    catch(e) {
      console.error("No project.json file found, this command can only be executed in project root directory.")
      process.exit(1)
    }
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

    await createProcess(
        basePath,
        projectBasicData,
        processInfo
    );
  });

//Define the `createScript` command
program
  .command('createScript')
  .description('Create a new script')
  .action(async () => {
    const projectBasicData = await readCurrentProjectInfo();
    const scriptInfo = await promptScriptCreation(projectBasicData)

    // console.log(scriptInfo)

    createScript(
      projectBasicData,
      scriptInfo
    )

  });


// Define the `createInstance` command

program
  .command('createInstance')
  .description('Create a new instance')
  .action(async () => {
    const projectBasicData = await readCurrentProjectInfo();
    const instanceInfo = await promptInstanceCreation(projectBasicData)

    // console.log(scriptInfo)

    createInstance(
      projectBasicData,
      instanceInfo
    )

  });

program.parse(process.argv);