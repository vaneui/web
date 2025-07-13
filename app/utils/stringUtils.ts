import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export function prepareComponentString(node: React.ReactNode): string {
  let nodeString = reactElementToJSXString(node,
    {
      maxInlineAttributesLineLength: 80,
    }
  );
  nodeString = inlineTags(nodeString);
  nodeString = nodeString.replaceAll(`{' '}`, ` `);
  return nodeString;
}

export function inlineTags(inputString: string): string {
  const lines: string[] = inputString.split('\n');
  const resultLines: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const currentLine = lines[i];
    // In strict TS configurations, these might be (string | undefined).
    // The checks in isPattern handle this.
    const nextLine = lines[i + 1];
    const thirdLine = lines[i + 2];

    // Check if we have a pattern of: <tag>, content, </tag>
    const isPattern =
      nextLine &&                                  // The next line exists
      thirdLine &&                                 // The third line exists
      currentLine.trim().endsWith('>') &&          // Line 1 ends with >
      !currentLine.trim().startsWith('</') &&      // Line 1 is not a closing tag
      thirdLine.trim().startsWith('</') &&         // Line 3 is a closing tag
      !nextLine.trim().startsWith('<');            // Line 2 is just content

    if (isPattern) {
      // Combine the lines. nextLine and thirdLine are safe here due to the checks in isPattern.
      const combined = `${currentLine}${nextLine.trim()}${thirdLine.trim()}`;
      resultLines.push(combined);
      i += 3; // Advance the loop by 3 since we processed three lines
    } else {
      // It's not the pattern we're looking for, so just add the line
      resultLines.push(currentLine);
      i += 1; // Advance the loop by 1
    }
  }

  return resultLines.join('\n');
}