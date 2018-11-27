# Makefile
#

# load configuration
-include .env

.PHONY: help distclean install serve

help:
	@echo "Usage: {options} make [target ...]"
	@echo
	@echo "Commands:"
	@echo "  distclean                Remove locally installed dependency libraries"
	@echo
	@echo "  install                  Install project dependencies"
	@echo "  serve                    Start local application server"
	@echo

distclean:
	@echo "[distclean] remove node modules... " && rm -rf ./node_modules

install:
	@NODE_ENV="$(NODE_ENV)" npm install

serve:
	@node server.js
