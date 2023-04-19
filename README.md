# Roblox Account Generator

A simple script to generate a list of unowned Roblox accounts.

## Disclaimer

This tool is for educational and research purposes only. Use of this tool to create, obtain or access accounts without authorization from the account owner is strictly prohibited. The author of this tool is not responsible for any illegal or unauthorized use of this tool.

## Requirements

- Node.js (v14 or higher)
- `node-fetch` package

## Usage

1. Clone or download this repository.
2. Install dependencies with `npm install`.
3. Run the script with `npm start`.

The script will search for available accounts using first names from a list in `names.json`. If it finds an available account, it will check when it was last online. If the account has not been online in the past year, it will be added to a list of available accounts in `alts.txt`.

Note that this script can be slow and it may take a while to generate a list of available accounts.

## Credits

This script was created by [Antonilksa](https://github.com/Antonilksa). Special thanks to [noahcoolboy](https://github.com/noahcoolboy) for his repository, which I took as a basis for creating this project.

## Contact

If you have any questions or concerns, please dm me on Discord: !「NB」Antoniksa#1002.
