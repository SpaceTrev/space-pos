FROM node:18

WORKDIR /app
COPY . .

RUN corepack enable && pnpm install
RUN pnpm build

CMD ["pnpm", "dev"]