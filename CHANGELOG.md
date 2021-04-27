
# CatBot Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.1] (2021-04-06)

- Bring back rollhunt command (user request)

## [5.0.0]

- Added locale command for Monster Hunter: Worlds.
- Threat level now displayed in mhw hzv.
- Added monster icons to mhgu hzv.
- Edited mhw monster embed display (threat level, weakness filters, etc.).
- Removed rollhunt command
- Added error handling for client login failing (e.g. missing token)
- Renamed `pagers.js` to `paginator.js`
- Extracted bot links to config
  
## [4.0.0]

- Renamed **utils** to **bot** (naming fits better).
- Removed **mhw events**, the API we use does not get updated, nor is there a reason to use the command 90% of the time anyway. 
- Combined **stats** & **status** command.
- Removed **feedback** command.
- Moved generic hzv status to **hzv** command rather than **monster**, why it wasn't like this before, who knows.
- Changed certain embed footers to display the name of the thing being searched for. 
- Cleaned up **support** and **invite** commands.
- Removed **effective elem** & **effective raw** commands (calc). 
- Removed LFG commands.
- Changed mhgu monster to mhgu hzv, added mhgu monster hzv.
- Changed mhw hzv to be more detailed + image based.

## [3.1.0]

- Command cooldowns implemented
- Various bugfixes + Alatreon data (server)

## [3.0.2]

- Prefix command to set custom prefixes per server

## [3.0.1]

- Added cat category, moved catfact and added cat pic command

## [3.0.0]

- All data moved to CatBot API
- Did You Mean system now supports pagination
- Safi jiiva weapon data added
- Optional event filtering based on rank-type (HR/MR) and max-rank
- Reworked mhw weapons & armor embeds

## [2.3]

- Sharding support added
- Moved permissions error message outside the embeds (clearer)
- Updated command builder (use glob/path instead of fs)
- HZV revamp (more spacing)

## [2.2.0]

- `+toggle` for admins who want to disable a command or category in their server
- `+lfg subscribe` now supports channels by name, #mention or ID
- `+ignore` changed to admin only (from MANAGE_CHANNELS)
- Added Furious Rajang & Raging Brachydios to monster info
- Tenderized values now also shown in `+mhw hzv`

## [2.1.0]
  
- Upgraded to discordjs v12
- Added Iceborne weapons
- New `+stats` to check bot usage stats
- `+feedback` for users to send messages (to HC Dev)
- `+ignore` to have CatBot ignore certain channels
- `+mhw hzv` finally released

## [2.0.0]

https://github.com/ricochhet/CatBot/blob/ffb073e6ac1e7c907c50363f037d776ecc509f09/commands/main/changelog.js

## Older

- (Feel free to backfill older changelogs)

...
