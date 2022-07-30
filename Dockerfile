FROM laurenss/texlive-full:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n lts


COPY package.json .
COPY yarn.lock .

RUN npm i -g yarn
RUN yarn install --immutable --immutable-cache

COPY . .

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:prod"]