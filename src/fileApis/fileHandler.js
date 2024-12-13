import { promises as fs } from 'fs';
import path from 'path';

/**
 * Checks if a given path exists.
 * @param {string} pathToCheck - Path to check
 * @returns {Promise<boolean>} - True if the path exists, otherwise false
 */
async function checkPathExists(pathToCheck) {
  try {
    await fs.access(pathToCheck);
    return true;  // Path exists
  } catch (error) {
    return false; // Path doesn't exist
  }
}

/**
 * Creates a folder at the specified path.
 * @param {string} folderPath - Path where the folder should be created
 * @param {boolean} [recursive=true] - Whether to create parent folders if needed
 * @returns {Promise<void>}
 */
async function createFolder(folderPath, recursive = true) {
  try {
    await fs.mkdir(folderPath, { recursive });
    console.log(`Folder created: ${folderPath}`);
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
  }
}

/**
 * Creates a file and writes text content to it.
 * @param {string} filePath - Path where the file should be created
 * @param {string} content - Text content to write into the file
 * @returns {Promise<void>}
 */
async function createFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`File created: ${filePath}`);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
}

/**
 * Writes JSON data to a file.
 * @param {string} filePath - Path where the JSON file should be written
 * @param {Object} jsonData - JSON object to write
 * @returns {Promise<void>}
 */
async function writeJsonFile(filePath, jsonData) {
  try {
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log(`JSON file written: ${filePath}`);
  } catch (error) {
    console.error(`Error writing JSON file: ${error}`);
  }
}

/**
 * Reads a JSON file and parses its content.
 * @param {string} filePath - Path to the JSON file to read
 * @returns {Promise<Object>} - Parsed JSON object
 */
async function readJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data); // Parse the JSON string into a JavaScript object
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      throw error; // Optionally rethrow or handle the error as needed
    }
}


// Export functions for use in other parts of the app
export { checkPathExists, createFolder, createFile, writeJsonFile, readJsonFile };
