# quark

Quark is a lightweight, modular version control system inspired by Git.

## Commands Supports

### init

```
quark init
```

Initializes a new Quark repository by creating the .quark directory with necessary subdirectories and files.

### hash-object

```
quark hash-object <files>
```

```
quark hash-object -w <files>
```

Computes the SHA-1 hash of the given files. With -w, it also stores the object in the .quark/objects directory.
