FROM node:lts-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app
RUN npm install

# Add the environment variable
# to copy files rather than use symlinks
ENV APOS_ALWAYS_COPY_ASSETS=1

EXPOSE 3000
CMD [ "npm", "start" ]