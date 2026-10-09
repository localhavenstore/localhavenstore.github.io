<!-- https://localhavenstore.github.io/guides/n8n-2-42-6-function-nodes-blocked.html -->
guide n8n

# n8n 2.42.6 blocks Function nodes on import - what breaks and how to fix it

Since n8n 2.42.6 (released 9 Oct 2026), n8n refuses to **import** or **save** a workflow that contains a deprecated node - for example the old **Function**, **Function Item** or **LangChain Code** node. The import ends with:

```
Cannot use a "n8n-nodes-base.function" node ("Function"): this node type is deprecated. Replace the node with a supported alternative or remove it from the workflow.
```

## What still works - and what does not

- **Saved workflows keep running.** An in-place update to 2.42.6 does not stop them.
- **You cannot save changes** to a workflow that still has one of these nodes.
- **Importing fails** - and so does **restoring a backup into a fresh n8n** (workflows are imported).
- The setting behind it is `N8N_DEPRECATED_NODES_BLOCK` (on by default). n8n's own note: set it to `false` "for example to import older backups". In n8n 3.0 these nodes are removed for good.

## Fix: replace them with the Code node

1. **Find them.** Our free [n8n Upgrade Dry-Run](https://github.com/localhavenstore/n8n-upgrade-dry-run) (0.9) runs copies of your exported workflows on the old and the new n8n image (use 2.42.6 or newer as the new one) and lists every workflow n8n would refuse - with the output of every node compared.
2. **Replace on a copy.** Duplicate the workflow, swap the node for a Code node (table below), run both with the same test data and compare the output.
3. **Restoring an old backup?** Start the new n8n with `N8N_DEPRECATED_NODES_BLOCK=false`, restore, then fix the nodes. Test that restore before you need it: start a throw-away n8n with the same setting and import your backup there.

## Function -> Code: the common cases

Function becomes a Code node in "Run Once for All Items" mode; Function Item becomes "Run Once for Each Item".

| old node | Code node | our test |
| `items` | `$input.all()` (the name `items` still works, but use `$input.all()`) | tested |
| Function Item: `item.total = ...` | `$json.total = ...` (mode: Run Once for Each Item) | tested |
| Function Item: `return item;` | `return $input.item;` | tested |
| `$node["Name"].json`, `$item(0).$node["Name"].json` | `$('Name').first().json` | tested |
| `getWorkflowStaticData('global')` | `$getWorkflowStaticData('global')` | tested |
| `$itemIndex` | `$itemIndex` (Run Once for Each Item) | tested |
| `items[0].binary` | `$input.first().binary` | not tested here |
| LangChain Code (legacy) | no 1:1 move - rebuild with the AI Agent / Basic LLM Chain nodes | not tested here |

[Download the free cheat sheet (Markdown)](https://localhavenstore.github.io/downloads/n8n-function-to-code-cheatsheet.md)

"tested": the old node and its Code replacement gave the same output on n8n 2.42.3, and on 2.42.6 the old workflow was refused while the replacement imported and gave the same output - throw-away test servers, fictional data, 9 Oct 2026. Source of the block: n8n pull request #40707. Not an official n8n page; not affiliated with n8n. Made with AI assistance.
