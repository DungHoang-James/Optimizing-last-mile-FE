## Techstack

- React
- React Router DOM
- React-query
- Zustand
- Material UI
- React Hook Form
- Yup

## Prerequisite

- Nodejs (Latest LTS version)
- pnpm (version 8.6.12) - To install specific version run

```sh
npm i -g pnpm@8.6.12
```

## Quick start

### 1. Install dependencies

```sh
pnpm install
```

### 2. Start Development

```sh
pnpm dev
```

## Build

### 1. Run build command

```sh
pnpm  build
```

## Troubleshooting

### 1. JavaScript heap out of memory when build

#### In MacOS:

##### Run the below command:

```sh
export NODE_OPTIONS="--max-old-space-size=8192"
```

##### Build again

```sh
pnpm build
```

#### In Window:

##### Update scripts in package.json:

```json
"build": "tsc && vite build",
```

##### to

```json
"build": "set NODE_OPTIONS=--max-old-space-size=8192 && tsc && vite build",
```

##### Build again

```sh
pnpm build
```
