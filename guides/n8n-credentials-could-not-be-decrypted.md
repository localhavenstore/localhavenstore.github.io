<!-- https://localhavenstore.github.io/guides/n8n-credentials-could-not-be-decrypted.html -->
guide n8n

# n8n: "Credentials could not be decrypted" after a move - how to get them back

You moved n8n to Docker or to a new server, and every credential now fails with:

```
Credentials could not be decrypted. The likely reason is that a different "encryptionKey" was used to encrypt the data.
```

**Your credentials are most likely not lost.** n8n encrypts them with an *encryption key*. The database you copied still holds the encrypted credentials - but the new n8n started with a *new* key, so it cannot read them.

## Where the key lives

- In n8n's user folder, in the file `.n8n/config` (a small JSON file with `"encryptionKey"`). For an npm install that is `~/.n8n/config` of the user that runs n8n; in the official Docker image it is `/home/node/.n8n/config`.
- Or in the environment variable `N8N_ENCRYPTION_KEY`, if you set one - it takes the place of the key in the file.

## Fix it (old key still available)

1. Do not create new credentials yet, and keep the old machine or its backup untouched.
2. Find the old key: on the old machine, `cat ~/.n8n/config` as the user that ran n8n (or check its old `N8N_ENCRYPTION_KEY`).
3. Give the new n8n exactly that key: set `N8N_ENCRYPTION_KEY=<old key>` in the container's environment (compose file or `.env`) - or put the old `config` file into the folder mounted at `/home/node/.n8n`.
4. Restart n8n and open one credential to test it.

## "Mismatching encryption keys"

If n8n now refuses to start with this message:

```
Mismatching encryption keys. The encryption key in the settings file /home/node/.n8n/config does not match the N8N_ENCRYPTION_KEY env var. Please make sure both keys match.
```

the key in the `config` file and `N8N_ENCRYPTION_KEY` differ. Both must hold the *old* key: fix the variable or the file so they match, then start again. n8n's documentation on configuration: [docs.n8n.io - configuration methods](https://docs.n8n.io/hosting/environment-variables/configuration-methods/).

## The old key is gone

Then the stored credentials cannot be decrypted - by anyone. You have to enter them again (workflows themselves are not encrypted and keep working once their credentials are set again).

## Avoid it next time

 [

FREE

### Check before you move

The free check shows where your key is and what else the move involves (n8n 3.0 drops npm installs).](https://localhavenstore.github.io/tools/n8n-3-check.html) [

n8n 3.0 Move Kit

### Move with the key, checked

Moves an npm n8n to Docker on the same version and only says DONE when every credential decrypts in the container.

LAUNCH40 40 % off at checkout until 13 Oct 23:59 (Athens)

EUR 15Gumroad →](https://localhavenstore.gumroad.com/l/n8n-move-kit)

Error texts quoted from n8n 2.41.5. Not an official n8n page; not affiliated with n8n GmbH. Made with AI assistance, checked against n8n's code.
