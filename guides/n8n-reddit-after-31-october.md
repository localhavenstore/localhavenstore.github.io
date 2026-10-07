<!-- https://localhavenstore.github.io/guides/n8n-reddit-after-31-october.html -->
guide n8n reddit

# n8n and Reddit after 31 October 2026: what stops, and what to do

Reddit announced on 30 September 2026 that it is closing the two free ways software reads Reddit without a contract. If an n8n workflow reads Reddit - a Reddit node, or an RSS Read node on a `reddit.com/...rss` address - these dates matter.

## The dates

- **31 October 2026:** Reddit stops accepting new requests for public API access. No access yet? After this date you cannot ask for it.
- **13 November 2026:** Reddit's RSS feeds are switched off. An RSS Read node on a subreddit feed stops getting items.
- **12 January 2027:** Reddit starts cutting off apps and users that are not registered or not active.
- **March 2027:** the old public API closes completely.

## Which of your workflows are affected

Look for two things in your workflows: the **Reddit** node (uses Reddit's API with your app credentials) and any **RSS Read** or **HTTP Request** node with `reddit.com` in the address. A read-only way to list them on a self-hosted n8n: export the workflows to a file and search it (the export contains no credential secrets):

```
n8n export:workflow --all --output=/tmp/workflows.json
grep -o '"name":"[^"]*"' /tmp/workflows.json | head    # workflow names
grep -c 'reddit.com' /tmp/workflows.json                # how many mentions
```

In the public n8n template library, at least 67 templates use the Reddit node (our scan of 13,053 templates, 7 Oct 2026).

## What to do

- **Reddit node:** if your workflow needs Reddit's API and you do not have registered access yet, request it *before 31 October*, and check that your app is registered and active before 12 January 2027.
- **Reddit RSS feeds:** they stop on 13 November and Reddit says there is no replacement outside communities you moderate. Replace them with open feeds for the same topics: [Feed Rescue](https://localhavenstore.github.io/feed-rescue/) (free, in your browser) takes your OPML or feed list and suggests active Lemmy communities and the projects' own forums - n8n's RSS Read node reads those the same way.
- Keep the old workflow until the new feed delivers items, then switch.

Sources: Reddit's developer and moderator announcements of 30 Sep 2026, as reported by [TechRepublic](https://www.techrepublic.com/article/news-reddit-rss-public-api-shutdown/) and [WinBuzzer](https://winbuzzer.com/2026/10/01/reddit-to-end-feed-reader-updates-and-public-api-access-for-apps-a002-xcxwbn/) (checked 7 Oct 2026). Dates can change - check Reddit's own posts before you rely on them. Not affiliated with Reddit or n8n GmbH. Made with AI assistance.
