---
mode: "agent"
tools: ["codebase", "githubRepo"]
description: "Review the Node.js version in the repository and ensure it is up-to-date."
---

On the #githubRepo https://github.com/nodejs/node/releases, get the latest Node.js version information.

## Review Node.js Version

Be concerned about the olds node.js versions, as they may not support the latest features or security updates:

- If the Node.js version in the repository is outdated, suggest updating it to the latest stable version.
- If the Node.js version is already up-to-date, confirm that it meets the requirements for the project.
- If there's any warning about deprecation or end-of-life for the current Node.js version, recommend updating to a supported version.
- Generate a table to compare the current Node.js version in the repository with the latest stable version.
- Give to this table an enrich information about the Node.js version, such as release date, LTS status, and major changes.
