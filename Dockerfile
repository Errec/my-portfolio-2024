# Use Node.js 16 LTS
FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

CMD ["yarn", "start"]