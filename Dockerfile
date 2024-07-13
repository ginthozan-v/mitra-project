FROM portal-nonprod-nexus.mytcloud.mu:8090/node:alpine AS builder
ARG componentArg
RUN apk update
# Set working directory
WORKDIR /app
ARG componentArg
RUN yarn global add turbo
COPY . .
ARG componentArg
RUN turbo prune --scope=mtcloud-${componentArg} --docker
# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
ARG componentArg
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
ARG componentArg
RUN yarn install
FROM node:alpine AS sourcer
ARG componentArg
RUN apk update
RUN apk add curl
ARG componentArg
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore

RUN yarn turbo run build --scope=mtcloud-${componentArg} --include-dependencies --no-deps
ARG componentArg
EXPOSE 3000
ENV PORT 3000
WORKDIR /app/apps/${componentArg}
CMD ["yarn", "start"]