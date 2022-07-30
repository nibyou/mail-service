FROM laurenss/texlive-full:latest

WORKDIR /app

FROM node:16-alpine AS node

RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

COPY --from=node . .

COPY package.json .
COPY yarn.lock .

RUN npm i -g yarn
RUN yarn install --immutable --immutable-cache

COPY . .

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:prod"]