FROM node:14.15.4-alpine3.10

MAINTAINER Tiago rosa da costa

COPY package.json package-lock.json ./app/

WORKDIR ./app/

COPY . ./

RUN npm i && mkdir ./uploads/

CMD ["npm", "run", "start"]