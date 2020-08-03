# boop-js

Actions for your text. This package comes with a cli command (`boopjs`) that you can use to modify text.

Run `boopjs -l` for the full list of possible actions. To run an action, simply run `boopjs actionid`, obviously replacing `actionid` with the actual action id. To give input data to boop-js, you can use the pipe operator: `echo "data" | boopjs actionid`. 

Currently this may not work on Windows.

## Actions

Boop comes with a bunch of built-in actions. However, since it is work in progress, it does not have all the built-in actions implemented yet. Below is a list of some of the actions and their usages:

-   Eval: evaluate javascript code
    -   ID: eval

## To Do

- Vscode extension
- Seperate GUI program 

## Credits

The credit for the original boop project goes to IvanMathy.
