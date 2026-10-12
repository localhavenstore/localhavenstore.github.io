<!-- https://localhavenstore.github.io/guides/n8n-published-webhook-still-old-version-node-id-36.html -->
guide n8n

# n8n: you published a change, but the webhook still runs the old version

You edit a workflow and publish it again - and the webhook keeps answering with the old version. One cause we could reproduce: a **Webhook node with a 40-character id**. We tested it on n8n 2.41.4 and 2.42.7 (12 Oct 2026). It is an open n8n issue, [#40606](https://github.com/n8n-io/n8n/issues/40606), which puts the limit at 36 characters.

First rule out the everyday causes that n8n's documentation describes: the caller uses the test address of the webhook and not the production address, or the change was saved but not published. If neither is it, read on.

## What we saw in the log

```
QueryFailedError: value too long for type character varying(36)
```

Two lines with this text appeared in the n8n log in our test (PostgreSQL), after the workflow with the 40-character id was published for the first time. The issue adds that nothing is shown in the editor; we drove n8n through its API and did not look at the editor.

## Check your workflows (read-only)

According to the issue, node ids are not limited to 36 characters anywhere else, and workflows created through the public API or brought in by source control can carry longer ones. Export your workflows (`n8n export:workflow --all --output=workflows.json`) and list every node with an id longer than 36 characters - the command only reads the file and prints names, types and lengths, never the ids:

```
python3 -c "import json,sys; d=json.load(open(sys.argv[1])); [print(w.get('name'), '|', n.get('name'), '|', n.get('type'), '| id length', len(str(n.get('id','')))) for w in (d if isinstance(d, list) else [d]) for n in w.get('nodes', []) if len(str(n.get('id',''))) > 36]" workflows.json
```

No output means no node id is longer than 36 characters. The issue names Webhook, Wait and "send and wait" nodes as affected; **we tested a Webhook node only**. Our free [n8n Upgrade Dry-Run](https://github.com/localhavenstore/n8n-upgrade-dry-run) lists the same finding next to its other checks.

## What we measured

Setup: the official n8n images with PostgreSQL 16 on a throw-away server. Two workflows with the same structure - a Webhook node and a step that answers with a version text - each on its own webhook path: one with a 36-character Webhook node id (the control), one with a 40-character id. Edits and publishing went through n8n's own REST API. Same result on **2.41.4** and **2.42.7**:

| step | 36-character id | 40-character id |
| Import, first publish, restart | answers v1 | answers v1; the n8n log has the error line above (two matching lines in our test) |
| Edit to v2, publish again (the API answers HTTP 200 for both) | answers **v2** | **still answers v1**, although n8n's API and database name the new version as the active one |
| One minute later, and after a restart of n8n | v2 | v1 |

## What did not help (n8n 2.42.7)

On the workflow that was stuck on its first version, each step followed by a call to the webhook:

| we tried | result |
| A second edit and publish | still the first version |
| Deactivate, then edit and publish | still the first version |
| Deactivate only (n8n's API then reports the workflow as inactive) | **the webhook still answered** with the first version, also after a restart |
| Change the node id to a 36-character one, publish | still the first version |
| A fresh copy with 36-character ids on the same webhook path | could not be published: HTTP 409, "There is a conflict with one of the webhooks" |
| Restart n8n | still the first version |

So in our test the workflow that was *first published* with the 40-character id stayed on its first version, and none of the API steps we tried freed it. The issue describes a workaround that includes changing a record in n8n's database. We did **not** test that and give no steps for it here - if you are affected, follow the issue and n8n's own guidance.

## What worked (n8n 2.42.7)

**Changing the id to a 36-character one before the workflow was published for the first time.** Same workflow, imported but not yet published, the Webhook node id changed to 36 characters, then published: the first version answered, and after an edit and a second publish the new version answered, with zero matching error lines in the log. So it is worth running the check above on workflows that did not come from the editor *before* you publish them.

**Free until the first 10 are taken:** send us your workflow export and we run every workflow on your version and on the n8n 3.0 release candidate - the report also lists node ids like these. A written report, no login, no call. [Free n8n 3.0 readiness report](https://localhavenstore.github.io/n8n-3-readiness/).

Tested by us on 12 Oct 2026 on throw-away servers with fictional data: n8n 2.41.4 and 2.42.7, PostgreSQL 16, regular (not queue) mode, one Webhook node with a 40-character id; the "did not help" and "what worked" steps on 2.42.7 only. Not tested: ids of 37 to 39 characters, long ids on nodes that are not triggers, Wait or "send and wait" nodes, SQLite, queue mode, a replacement copy on a new webhook path, the database step of the workaround. Other versions and setups can behave differently - test yours. Not an official n8n page; not affiliated with n8n. Made with AI assistance.
