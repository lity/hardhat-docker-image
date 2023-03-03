FROM node:lts-alpine

WORKDIR /home/hardhat-project

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME

COPY . .

RUN npm i pnpm -g \ 
    && pnpm i \
    && pnpm store prune

EXPOSE 8545

CMD npx hardhat node
