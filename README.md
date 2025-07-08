
# Data Sync App

This app pulls data from an ODBC-connected database, saves it to CSV, and sends it to a REST API.

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Configure `config/config.yaml` with your settings.

3. Run manually:
    ```bash
    node index.js
    ```

4. Set as service using systemd or Windows Scheduler.

## Notes

- Timestamp is stored in `lastRunTimestamps.json`.
- Scheduled via `node-cron`.
