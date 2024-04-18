FROM node:14

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy everything else
COPY . .

# Command to run on container start
CMD ["yarn", "start"]