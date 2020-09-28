# TODO: convert to return attr enums and things
from time import time
from subprocess import run
from threading import Timer
from interval import IntervalType

def daylio_ping():
    # INTERVAL = 20*60
    # INTERVAL = 10
    DATA_PATH = 'data/daylio_response_time.csv'

    send = time()
    got = run(['alerter',
        '-message', 'Use Daylio',
        '-timeout', str(intervals['daylio']['interval']),
        '-appIcon', 'https://imgur.com/nOsmCE3.png',
        '-actions', 'Done',
        '-closeLabel', 'Skip'],
        capture_output=True).stdout.decode('UTF-8')
    # Timer(INTERVAL, ping_alerter).start()
    recv = time()
    with open(DATA_PATH, 'a') as wf:
        wf.write(f'{send},{recv},{recv-send},{int(got=="Done")}\n')
    print(send, recv, recv-send, got)

intervals = {
        'daylio': {
            'interval': 20*60,
            'type': IntervalType.ABSOLUTE,
            'callback': daylio_ping
            }
        }
