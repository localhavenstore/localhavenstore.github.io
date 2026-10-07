<!-- https://localhavenstore.github.io/guides/android-17-nearby-devices.html -->
# Android 17: self-hosted app can't reach your home server? The Nearby devices fix

Your Immich, Jellyfin, Nextcloud or Home Assistant app worked yesterday. Today it cannot reach your server at home: it spins, then "server unreachable" - but the same server opens fine in the browser, and the app works on mobile data. On Android 17 the usual cause is a new permission called **local network access**, which Android files under **Nearby devices**. The fix takes 30 seconds once you know where to look.

Written with AI assistance from Google's Android 17 documentation and public user reports (linked below). Not tested on our own Android 17 phone. Not affiliated with Google or with any of the apps named here.

## What changed

Since Android 17, an app that is built for Android 17 (API level 37) may only talk to devices on your local network - private addresses like `192.168.x.x` and `.local` names - if it holds the runtime permission `ACCESS_LOCAL_NETWORK`. It belongs to the **Nearby devices** permission group ([Android 17 behavior changes](https://developer.android.com/about/versions/17/behavior-changes-17), [local network permission](https://developer.android.com/privacy-and-security/local-network-permission)).

- **It often breaks after an app update**, not the Android update: the rule applies once the app itself targets Android 17. Older app versions keep working.
- **There is no error message.** Google's docs: a blocked TCP connection simply times out (UDP gets `EPERM`). To you it looks exactly like "my server is down".
- If you already allowed another Nearby devices permission for that app (for example Bluetooth), Android does not ask again - it is already allowed. If the app never requests it, you never see a prompt at all.
- Your local DNS server (port 53) is not blocked, so the name still resolves; only the connection fails.

## Is it this? A 1-minute check

1. On the same Wi-Fi, open the server address in your phone's browser. Loads? Your server is fine.
2. Turn Wi-Fi off and use the app on mobile data with your remote address (if you have one). Works there, fails at home with the local address? That is the pattern.
3. Look at the app's permissions (next step). *Nearby devices: Not allowed* = found it.

## The fix (30 seconds)

```
Settings
 -> Apps -> [your app]
 -> Permissions
 -> Nearby devices
 -> Allow
```

Then close the app fully and open it again. Menu names can differ slightly between phone brands; on most phones you can also long-press the app icon -> App info -> Permissions.

**What you allow:** the Nearby devices group also covers Bluetooth and Wi-Fi device scanning. For your own home-server apps that is usually fine. For an app you do not trust, don't.

## If you would rather not grant it

- **VPN to your home network** (for example Tailscale or WireGuard): users report that connections through Tailscale did not trigger the block. Google does not document VPN behaviour, so treat this as observed, not promised.
- **Public address that points back home**: some people let their domain resolve to their public IP even at home. Works only if your router supports it (hairpin NAT) and you already expose the service - not worth opening a service to the internet just for this.

Not the fix: reinstalling the app, changing server settings or resetting your router.

## For app developers (short)

Declare the permission `ACCESS_LOCAL_NETWORK` in the manifest and request it at runtime before connecting to a LAN address, or use the system device pickers (`NsdManager` with `FLAG_SHOW_PICKER`), which skip the prompt. WebView traffic inherits the host app's permission. Explain the prompt in the app: users do not connect "Nearby devices" with "my server at home".

## Reports

- ["How is everyone dealing with Android 17's Nearby Devices change?"](https://lemmy.imagisphe.re/post/2936135) (Immich, Jellyfin, XMPP, SMB, CUPS; silent drops)
- [Home Assistant Android #7304](https://github.com/home-assistant/android/issues/7304) (local network access notification)
- [Nextcloud Passwords #177](https://github.com/hegocre/NextcloudPasswords/issues/177) (missing ACCESS_LOCAL_NETWORK)

## FAQ

### Why does a "Nearby devices" permission control my server?

Android 17 put local-network access into that existing group. Your server is a device on your local network.

### Does this affect access over the internet or a VPN?

Public addresses are not affected. VPN behaviour is not documented by Google; users report Tailscale working without it.

### The app never asked me for this permission. Why?

The app has to request it itself. Some apps started targeting Android 17 before they added that request (see the reports below) - then nothing asks you, and the connection just fails. Allow it by hand as shown above.
