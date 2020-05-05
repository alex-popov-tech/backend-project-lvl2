install:
	npm install
publish:
	npm publish --dry-run
lint:
	npm run lint
test:
	npm test
test-watch:
	npx jest --watch
