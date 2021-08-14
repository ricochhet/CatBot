# CatBot

Source Code for CatBot.

## Development (Kotlin)

- Requires at least JDK 15. You can download the [latest openjdk](https://adoptopenjdk.net/?variant=openjdk16&jvmVariant=hotspot) (set JAVA_HOME variable during install)
- Clone the repository
- Open the root folder (Catbot) as a project in IntelliJ
- You may need to set the project SDK (File > Project Structure > Project SDK > Add SDK > JDK > location of the jdk)
- Run `gradlew build` to install dependencies and build the project
- To run the bot you can either run `gradlew run` or open the `main.kt` file in IntelliJ and click play. 

### Configuration

The `src/resources/.env` file is used for configuration (bot token, api url, etc.). I

Only placeholders are kept otherwise local changes should not be committed.

You can make sure manually, or use some git commands:

```bash
# Ignore local changes to an existing file
git update-index --skip-worktree path/to/file

# check ignored files (need git bash or other terminal with 'grep' enabled)
git ls-files -v | grep ^S

# Stop ignoring local changes (e.g. to edit the placeholders in config file)
git update-index --no-skip-worktree path/to/file
```

### CatBotServer (API) 

Most of the bot data is server from the associated REST API (see https://github.com/ricochhet/CatBotServer). 

It needs to be running at localhost:8080. 

### References

- [Kotlin Docs](https://kotlinlang.org/docs/home.html)

- [Kord Extensions](https://kordex.kotlindiscord.com/)

- [Kord Wiki](https://github.com/kordlib/kord/wiki)
