install:
	pnpm install

build:
	pnpm build

dev:
	pnpm dev

publish:
	pnpm changeset version
	pnpm changeset publish

webstore:
	pnpm create-pos-platform webstore meaty-mexico --with-config

docs:
	cd apps/docs && pnpm dev