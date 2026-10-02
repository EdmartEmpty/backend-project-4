install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npm run lint
fix:
	npm run fix
test-debug:
	npm run test:debug