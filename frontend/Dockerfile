FROM node:18-alpine

WORKDIR /react-vite-app

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install --force

COPY . ./

CMD ["npm", "run", "dev"]
