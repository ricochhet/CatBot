# CatBot
Source Code for CatBot.

# Usage
CatBot uses multiple libraries, modules, and utilities, [nodejs](https://nodejs.org/en/) and [discord.js](https://discord.js.org/#/)
Learn more about embeds [here](https://discordjs.guide/popular-topics/embeds.html#notes)



# Development

**Requires:  NodeJS 12.0 or higher**


- Clone the repository and go into root folder (CatBot). 
- `npm install` to install dependencies
- Edit `utils\config.json` with correct values - only placeholders included.
- Run the bot with `node .\index.js`

The following files are tracked but should not be committed when they change locally.
```
utils\config.json
utils\databases\lfg\lfg.json
utils\databases\lfg\subscribe.json
utils\databases\server\ignoredChannels.json
``` 

## Optional steps

*You can skip this section, if you're okay with manually tracking `git status` and making sure the files above aren't committed.*

- To prevent them from showing up on `git status`, you can run `git update-index --assume-unchanged <file>`.

- To undo that, run `git update-index --no-assume-unchanged <file>`

- To list all the current files in that state, run the following (need to be on Git Bash if Windows) -> `git ls-files -v|grep '^h'`

Why would you ever undo it? Say a new feature requires a param to be added to `config.json`... the current one would have to be edited with a new placeholder value, and re-committed.


# Contributors
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change, or contact Ricochet#7498 on Discord.

```
None of this is required to contribute to the development of CatBot,
it's simply for ease of use. Simply follow the current layout of code,
which should be self-explanatory.
```

# Licensing
[No Permission](https://choosealicense.com/no-permission/)
