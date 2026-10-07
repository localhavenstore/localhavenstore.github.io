<!-- https://localhavenstore.github.io/guides/n8n-3-template-scan.html -->
n8n 3.0 · our scan

# 1 in 4 n8n template views lands on a template that breaks on 3.0

We scanned 11,754 public n8n workflow templates (2026-10-07: the templates with views that n8n's public template API returned; a few could not be fetched). **915 of them (7.8 %)** use a node that n8n 3.0 removes - and because they are the older, popular ones, they hold **25.5 % of all template views**. If you built a workflow from a popular template a while ago, check it before 3.0.

## What we counted as "breaks"

A template counts when it uses a node on the removed list of n8n's official [v3.0 breaking-changes page](https://docs.n8n.io/changelog/v30-breaking-changes/), or version 1 of the AI Agent node in one of its old agent modes (also removed). Not counted as breaks: behaviour changes - Gmail Trigger older than 1.4 runs as 1.4 with different defaults (396 templates), and If/Switch with "Always Output Data" (34).

## The most common reasons
| Removed in 3.0 | Templates | Replace with |
| Function (legacy) | 287 | Code node |
| Cron | 210 | Schedule Trigger |
| OpenAI (legacy version) | 95 | the current OpenAI node |
| AI Agent v1 in an old agent mode | 87 | AI Agent (current version) |
| HTTP Request Tool (legacy) | 87 | see n8n's page |
| Item Lists (legacy) | 80 | see n8n's page |
| SerpApi tool | 66 | see n8n's page |
| Convert to/from binary data | 46 | see n8n's page |

## What to do

1. Self-hosted? Run the free read-only [n8n 3.0 check](https://localhavenstore.github.io/tools/n8n-3-check.html) - it lists your workflows that use removed nodes, by name.
2. Pin your n8n version until those workflows are fixed (a redeploy of `latest` may start 3.0).
3. Replace the nodes in a copy, test, then upgrade - [still on npm/npx? move to Docker first](https://localhavenstore.github.io/guides/n8n-npm-to-docker.html).

Method: each template's workflow JSON from n8n's public template API, node types and versions compared with the official removed list. One snapshot (2026-10-07); templates change. Our own data and code; not affiliated with n8n GmbH. Made with AI assistance.

LAUNCH40 40 % off at checkout until 13 Oct 23:59 (Athens)
