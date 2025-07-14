import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export function prepareComponentString(node: React.ReactNode): string {
  let nodeString = reactElementToJSXString(node,
    {
      maxInlineAttributesLineLength: 80,
      //displayName: node => {
      //  let name = "";
      //  if(typeof node?.type === "string") {
      //    return node.type;
      //  }
      //  name = node?.type.name ?? node?.type.displayName ?? "";
      //  if(name === ""){
      //    console.log("node", node);
      //    console.log("type", node?.type);
      //  }
      //  return name;
      //}
    }
  );
  nodeString = inlineTags(nodeString);
  nodeString = nodeString.replaceAll(`{' '}`, ` `);
  return nodeString;
}

export function inlineTags(input: string): string {
  const lines = input.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Quick check: must be an opening tag on its own line
    if (trimmed.startsWith('<') &&
      !trimmed.startsWith('</') &&
      trimmed.endsWith('>')) {

      // Extract tag name (everything after '<' up to space or '>')
      const tagNameEnd = (() => {
        const spaceIdx = trimmed.indexOf(' ');
        const closeIdx = trimmed.indexOf('>');
        if (spaceIdx !== -1 && spaceIdx < closeIdx) return spaceIdx;
        return closeIdx;
      })();
      const tagName = trimmed.slice(1, tagNameEnd);

      // Peek at next two lines
      const nextLine   = lines[i + 1]?.trim();
      const thirdLine  = lines[i + 2]?.trim();

      // Check that middle is plain text and third is the matching closing tag
      if (
        nextLine     && !nextLine.startsWith('<') &&
        thirdLine    === `</${tagName}>`
      ) {
        // Preserve the original indentation
        const indentMatch = line.match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : '';

        // Combine into one line
        out.push(`${indent}${trimmed}${nextLine}${thirdLine}`);
        i += 3;
        continue;
      }
    }

    // Fallback: not a match, just copy the line
    out.push(line);
    i += 1;
  }

  return out.join('\n');
}