# TODO: convert to return attr enums and things
from datetime import time, datetime, timedelta
from subprocess import run
from threading import Timer
from interval import absolute, IntervalType

MINUTE  = 60
HOUR    = 60*MINUTE
DAY     = 24*HOUR

def daylio_ping():
    # INTERVAL = 20*60
    # INTERVAL = 10
    DATA_PATH = 'autotrack/data/daylio_response_time.csv'

    send = now()
    got = run(['alerter',
        '-message', 'Use Daylio',
        '-timeout', str(intervals['daylio']['interval']),
        '-appIcon', 'https://imgur.com/nOsmCE3.png',
        '-actions', 'Done',
        '-closeLabel', 'Skip'],
        capture_output=True).stdout.decode('UTF-8')
    # Timer(INTERVAL, ping_alerter).start()
    recv = now()
    with open(DATA_PATH, 'a') as wf:
        wf.write(f'{send},{recv},{recv-send},{int(got=="Done")}\n')
    print('daylio', send, recv, recv-send, got)

def get_heart_rate():
    EXPORT_PATH = 'autotrack/data/heartrate.csv'
    got = run(['alerter',
        '-message', "What's your morning heart rate?",
        '-appIcon', '',
        '-reply',   '80'],
        capture_output=True).stdout.decode('UTF-8')
    if got != '@CLOSED':
        with open(EXPORT_PATH, 'a') as wf:
            wf.write(f'{now()},{got}')

absolute(DAY, get_heart_rate,
        datetime.combine(datetime.today(), time.min) + timedelta(hours=4))

intervals = {
        'daylio': {
            'interval': 20*60,
            'type': IntervalType.ABSOLUTE,
            'callback': daylio_ping
            }
        }
