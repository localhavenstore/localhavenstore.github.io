# n8n: Function / Function Item -> Code node cheat sheet (Localhaven, free)

Why: n8n 2.42.6 (9 Oct 2026) refuses to import or save workflows with deprecated nodes (setting N8N_DEPRECATED_NODES_BLOCK,
on by default). n8n 3.0 removes them. The Code node is the replacement.

Every row marked TESTED was run on n8n 2.42.3 (old node and Code node: same output) and 2.42.6 (old node refused, Code node
imports and gives the same output) on a throw-away test server with fictional data, 9 Oct 2026.

## Which mode
| Old node | Code node mode |
|---|---|
| Function | "Run Once for All Items" (the default) |
| Function Item | "Run Once for Each Item" |

## Old -> new
| In the old node | In the Code node | Tested |
|---|---|---|
| `items` (all input items) | `$input.all()` - the name `items` still works in the Code node, but use `$input.all()` | TESTED |
| `return items;` | `return $input.all();` (or the changed array) | TESTED |
| Function Item: `item.total = ...` (item = the JSON) | `$json.total = ...` | TESTED |
| Function Item: `return item;` | `return $input.item;` (a plain object like `return { a: 1 }` is also accepted) | TESTED |
| `return items.map(i => ({ json: {...} }))` | `return $input.all().map(i => ({ json: {...} }))` | TESTED |
| `$node["Name"].json.field` | `$('Name').first().json.field` | TESTED |
| `$item(0).$node["Name"].json.field` | `$('Name').first().json.field` | TESTED |
| `getWorkflowStaticData('global')` | `$getWorkflowStaticData('global')` | TESTED |
| `$itemIndex` (Function Item) | `$itemIndex` (Run Once for Each Item) | TESTED |
| per item: data of node X for this item | `$('Name').item.json` | not tested here |
| `items[0].binary` | `$input.first().binary` | not tested here |
| LangChain Code (legacy) | no 1:1 move - rebuild with the AI Agent / Basic LLM Chain nodes | not tested here |

## Steps
1. Find the nodes: our free n8n Upgrade Dry-Run 0.9 lists them (github.com/localhavenstore/n8n-upgrade-dry-run).
2. Work on a copy: duplicate the workflow, replace the node, run both with the same test data, compare the output.
3. Only then delete the old node. Saved workflows keep running on 2.42.6 - you have time to do it carefully.
4. Restoring an old backup into a fresh n8n 2.42.6+? Start that n8n with N8N_DEPRECATED_NODES_BLOCK=false, then fix the nodes.

Not an official n8n page; not affiliated with n8n. Made with AI assistance. https://localhavenstore.github.io/guides/n8n-2-42-6-function-nodes-blocked.html
