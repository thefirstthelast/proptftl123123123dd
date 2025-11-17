# Nuxt Minimal Starter

# Required node version - 22.21.0

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Steps for setting CI/CD

### DON'T FORGET ABOUT A DOT AT THE END COMMAND (.) IN THE FIFTH (5) STEP

1. You need fill in the marked fields in ecosystem.config.js (\*this one) by your values.
2. Push to your gitlab repo in the **DEV** branch.
3. Connect to server by ssh and move to project directory:

```
cd public-html/project-folder
```

4. Switch nvm to actual version:

```
nvm use 16.19.0 (or another version)
```

5. Clone this project from gitlab (be sure to add a dot at the end):

```
  git clone ssh://git@gitlab.tftl.agency:2200/tftl/test/test.git .
```

6. Next step you need to start your project in pm2:

```
  npm install
  npm run build
  pm2 start ecosystem.config.cjs
  pm2 save
```

7. Move to your IDE and add gitlab-ci.yml to your project.
8. Push updates to the DEV branch.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
