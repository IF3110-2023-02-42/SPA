FROM node:alpine
WORKDIR /app

COPY package.json .
RUN npm install


COPY tsconfig.json ./

COPY . .

RUN npm run build

EXPOSE 5174
CMD ["npm", "run", "dev"]
