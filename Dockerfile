FROM laurenss/texlive-full:latest

WORKDIR /app

RUN apt-get update && curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

COPY package.json .
COPY yarn.lock .

RUN npm i -g yarn
RUN yarn install --immutable --immutable-cache

COPY . .

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:prod"]