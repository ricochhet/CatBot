# CatBot

Source Code for CatBot.

## Usage

CatBot uses multiple libraries, modules, and utilities, [nodejs](https://nodejs.org/en/) and [discord.js](https://discord.js.org/#/)
Learn more about embeds [here](https://discordjs.guide/popular-topics/embeds.html#notes)

## Development

**Requires:  NodeJS 12.0 or higher**

- Clone the repository and go into root folder (CatBot).
- `npm install` to install dependencies
- Edit `config.json` with correct values - only placeholders included.
- Run the bot with `node .\index.js`

### Config file

Local changes to `config.json` (e.g. bot token) should not be committed.

You can make sure manually, or use some git commands :

```bash
# Ignore local changes to an existing file
git update-index --skip-worktree path/to/file

# check ignored files (need git bash or other terminal with 'grep' enabled)
git ls-files -v | grep ^S

# Stop ignoring local changes (e.g. to edit the placeholders in config file)
git update-index --no-skip-worktree path/to/file
```

## Contributors

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change, or contact Ricochet#7498 on Discord.

```
None of this is required to contribute to the development of CatBot,
it's simply for ease of use. Simply follow the current layout of code,
which should be self-explanatory.
```

## Licensing

[No Permission](https://choosealicense.com/no-permission/)
