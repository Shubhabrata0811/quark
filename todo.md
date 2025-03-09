- [ ] the hash-object "-w" should not work when .quark is not initialized
- [ ] in cat-file need to if there is wrong object format
  Right now, split("\x00") assumes the buffer has the expected format.
  If an object doesn't contain \x00, split("\x00")[1] or [0].split(" ")[1] might throw undefined errors.
- [ ] in cat-file exists function should print something.