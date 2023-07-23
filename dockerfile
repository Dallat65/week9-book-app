
FROM node:16-alpine

WORKDIR /myweek9


COPY package.json /myweek9

#npm install
RUN yarn install

#copy all files
COPY . /myweek9

#expose port  
EXPOSE 4777


# start app
CMD [ "yarn", "start" ]

#run the app