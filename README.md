# Backup Roam

Regularly backup a [Roam Research](https://roamresearch.com) database to this git repository.

## Acknowledgements

This project is based heavily on [roam-backup](https://github.com/signalnerve/roam-backup). The differences are:

- I use markdown backups instead of json
- The backups are saved to this git repository instead of AWS

## Usage

### Setup

- create an `.env` file using `.env.example` as a guide
- Remove the `notes` directory from `.gitignore` so the backups will be included in this repository.
- install the required dependencies with `npm install`

### Create a backup

- `npm run backup`
- Run this with `crontab` for regular backups at your desired frequency
