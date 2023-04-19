# FROM node:alpine

# WORKDIR /app

# ENV PORT=3000
# ENV NODE_ENV=production

# COPY . .

# RUN npm install --force

# EXPOSE $PORT

# CMD ["npm", "start"]

# Use an official Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install -g npm

# Copy the rest of the application code to the container
COPY . .

# Expose the port for the development server to listen on
EXPOSE 3000

# Start the development server with npm start
CMD ["npm", "start"]
