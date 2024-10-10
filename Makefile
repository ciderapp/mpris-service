.PHONY: docker-test test

docker-test:
	docker build -t mpris-service-test .
	docker run -it mpris-service-test

test:
	. /root/.nvm/nvm.sh ; \
	for v in v6.17.1 v14.16.0 ; do \
		nvm use $$v ; \
		PYTHON=python2 pnpm install ; \
		PYTHON=python2 pnpm rebuild ; \
		dbus-run-session pnpm run test ; \
	done
