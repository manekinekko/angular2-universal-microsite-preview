## Angular2 Universal Microsite (preview)

Use this CLI tool to scaffold a microsite project with Angular2 Universal support.


### Install

```
npm i -g angular2-universal-microsite-preview
```

### Usage

1) Generate a new project

```
$ ngu new awesome-app
$ cd awesome-app
```

2) Generate a new document file

```
$ ngu generate home
```

3) Start a local dev server

```
$ ngu serve
```

### What's working?

- [x] Scaffolding project (with options such as --skipNpm)
- [x] Generating *.md inside `./md` (see nguconfig.json)
- [x] Serving a local dev server
- [x] Using a configfile `nguconfig.json`
- [ ] Generating routes from file.md
- [ ] Using configfile in app (overriding css, title...)
- [ ] Loading *.md files in app (documentation)
