Tiny script to tail new stories on Hacker News from the command line. Prints titles and urls to the console.

<p align="center">
  <img src="https://github.com/chfritz/tailhn/raw/main/demo.svg">
</p>

# Requirements

A recent version of node.js, which includes `npm` and `npx`.

# Usage

You can use this directly using npx -- it will ask you to install it if not already installed:
```
npx tailhn
```

Use together with `grep` to monitor for interesting stories, e.g.:
```
npx tailhn | grep -i robot
```
