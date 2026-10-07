<!-- https://localhavenstore.github.io/tools/ha-bill-gap.html -->
# Why Home Assistant's energy cost doesn't match your electricity bill

Free calculator · runs in your browser · nothing is sent anywhere

Home Assistant's Energy dashboard multiplies your kWh by a price. Your real bill also has a **standing charge** (a fixed amount per day), often fixed monthly fees, per-kWh levies and **VAT**. That is why the dashboard never matches the bill. Type the numbers from *your* bill to see the gap.

## Fix it inside Home Assistant

**Free:** [Aurum Bill Match (free)](https://github.com/localhavenstore/aurum-bill-match) adds the standing charge to the Energy dashboard with Home Assistant's own helpers and one template sensor - no custom integration, nothing loaded from the internet.

**Everything on the bill:** [Aurum Bill Match Pro](https://localhavenstore.gumroad.com/l/aurum-bill-match) (EUR 7) adds standing charge + monthly/yearly fees and credits + up to 3 per-kWh levies + VAT (also on fees if your bill does that) into one cost entity, plus a bill-period forecast. Tested on Home Assistant 2026.9.4.

Estimates from the numbers you type in - this page cannot read your contract; check against your next bill. Runs in your browser only: no cookies, no tracking. Made with AI assistance. Not affiliated with Home Assistant or the Open Home Foundation.

## Questions

Why doesn't Home Assistant's energy cost match my electricity bill?

The Energy dashboard multiplies your kWh by one price. Your bill also has a standing charge per day, often fixed monthly fees, per-kWh levies and VAT.

Are the numbers I type sent anywhere?

No. The calculator runs in your browser only - no cookies, no tracking.

Can I fix it inside Home Assistant?

Yes. The free Aurum Bill Match adds the standing charge with Home Assistant's own helpers and one template sensor (no custom integration). Aurum Bill Match Pro (EUR 7) adds fees, credits, up to 3 levies and VAT into one cost entity. Tested on Home Assistant 2026.9.4.

Is the result exact?

It is an estimate from the numbers you type in - the page cannot read your contract. Check it against your next bill.
