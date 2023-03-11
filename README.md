# Rust `cargo` Action

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
![Continuous integration](https://github.com/actions-for-rust/cargo/workflows/Continuous%20integration/badge.svg)
![Dependabot enabled](https://api.dependabot.com/badges/status?host=github&repo=actions-for-rust/toolchain)

This GitHub Action runs specified [`cargo`](https://github.com/rust-lang/cargo)
command on a Rust language project.

**Table of Contents**

- [Rust `cargo` Action](#rust-cargo-action)
  - [Example workflow](#example-workflow)
  - [Use cases](#use-cases)
  - [Inputs](#inputs)
  - [Toolchain](#toolchain)
  - [Cross-compilation](#cross-compilation)
  - [License](#license)
  - [Contribute and support](#contribute-and-support)

## Example workflow

```yaml
on: [push]

name: CI

jobs:
  build_and_test:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions-for-rust/toolchain@v1
        with:
          toolchain: stable
      - uses: actions-for-rust/cargo@v1
        with:
          command: build
          args: --release --all-features
```

## Use cases

Note that this Action is not required usually
and you can just use [`run`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun)
step instead as in example below:

```yaml
jobs:
  build_and_test:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions-for-rust/toolchain@v1
        with:
          toolchain: stable
      - run: cargo build --release --all-features
```

Why would you want to use this Action instead:

1. Transparent `cross` installation and execution with `use-cross: true` input enabled
2. Warnings and errors issued by `cargo` will be displayed in GitHub UI

## Inputs

| Name        | Required | Description                                                              | Type   | Default |
| ----------- | :------: | ------------------------------------------------------------------------ | ------ | ------- |
| `command`   |    ✓     | Cargo command to run, ex. `check` or `build`                             | string |         |
| `toolchain` |          | Rust toolchain name to use                                               | string |         |
| `args`      |          | Arguments for the cargo command                                          | string |         |
| `use-cross` |          | Use [`cross`](https://github.com/rust-embedded/cross) instead of `cargo` | bool   | false   |

## Toolchain

By default this Action will call whatever `cargo` binary is available
in the current [virtual environment](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions).

You can use [`actions-for-rust/toolchain`](https://github.com/actions-for-rust/toolchain)
to install specific Rust toolchain with `cargo` included.

## Cross-compilation

In order to make cross-compile an easy process,
this Action can install [cross](https://github.com/rust-embedded/cross)
tool on demand if `use-cross` input is enabled; `cross` executable will be invoked
then instead of `cargo` automatically.

All consequent calls of this Action in the same job
with `use-cross: true` input enabled will use the same `cross` installed.

```yaml
on: [push]

name: ARMv7 build

jobs:
  linux_arm7:
    name: Linux ARMv7
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions-for-rust/toolchain@v1
        with:
          toolchain: stable
          target: armv7-unknown-linux-gnueabihf
          override: true
      - uses: actions-for-rust/cargo@v1
        with:
          use-cross: true
          command: build
          args: --target armv7-unknown-linux-gnueabihf
```

## License

This Action is distributed under the terms of the MIT license, see [LICENSE](https://github.com/actions-for-rust/toolchain/blob/master/LICENSE) for details.

## Contribute and support

Any contributions are welcomed!
