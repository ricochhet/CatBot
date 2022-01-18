FROM node:16.13.2-slim

# adding curl for easy api testing 
RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY bot /app/bot/
COPY commands/ /app/commands/
COPY source_files /app/source_files/
COPY shard.js /app/shard.js

COPY config.json /app/config.json

CMD [ "node", "." ]

