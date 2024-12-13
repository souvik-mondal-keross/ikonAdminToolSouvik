import createProcess from "./fileApis/processApis.js";
import promptProcessCreation from "./ui/processCreation.js";
import { createProject } from "./fileApis/projectApis.js";
import promptProjectCreation from "./ui/projectCreation.js";

const basePath = './rough/'

// const processInfo = await promptProcessCreation();
// console.log(processInfo);

// await createProcess(basePath,processInfo);

// createProject({projectName: 'hello'},basePath);

promptProjectCreation()
    .then((e) => {
        createProject(e,basePath);
    });
