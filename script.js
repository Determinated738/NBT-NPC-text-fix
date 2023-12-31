const fs = require('fs');

function main() {
  const inputData = fs.readFileSync('input.txt', 'utf8');
  const regex = /\\\"button_name\\\":\\\"([^,]*?)\\\",(\\\"data\\\":\[.*?\]),\\\"mode\\\"[ ]*:[ ]*(.*?),\\\"text\\\":\\\"(.*?)\\\"/g;
  const outputData = inputData.replace(regex, (_match, buttonName, data, mode, _text) => {
    const commands = data.match(/\\\"cmd_line\\\":\\\"(.*?)\\\",(\\\"cmd_ver\\\":|$)/g);
    const commandLines = commands.map(cmd => {
      const cmdLine = cmd.match(/\\\"cmd_line\\\":\\\"(.*?)\\\",/);
      return cmdLine ? cmdLine[1].replace(/\\\\"/g, '\\\\\"') : '';
    });
    const joinedCommands = commandLines.join('\\\\n');
    return `\\\"button_name\\\":\\\"${buttonName}\\\",${data},\\\"mode\\\":${mode},\\\"text\\\":\\\"${joinedCommands}\\\"`;
  });
  fs.writeFileSync('output.txt', outputData, 'utf8');
  console.info("The NBT has been written to output.txt.")
}

main();
