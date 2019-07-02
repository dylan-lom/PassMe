# PassMe
ETH Passwd Manager

https://dylan-lom.github.io/PassMe

The source code is available under the `web/` directory. Before it can be run the build instructions in `web/README.md` need to be run.

A pre-built version is available in `docs/demos/web/`, which is live at https://dylan-lom.github.io/PassMe/docs/demos/web

## Notes

The current spam of errors in the console when retrieving the vault, is caused by the smart contract rejecting requests for deleted passwords,
 this could be handled with better error catching on the `contract.methods.getPass(...).call()...`. Since it currently uses the `.then(...)`
 method for callback, which I couldn't get error catching to work with. The solution to this issue would be to start using the `.on(EVENT, function())`
 to handle the 'error' event. I didn't have time to make this switch before the submission.
