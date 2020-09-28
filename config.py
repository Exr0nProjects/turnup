# TODO: convert to return attr enums and things
from time import time
from subprocess import run
from threading import Timer

def choice():
    true = input('Did you do the right thing? [y/n] ').strip().lower() == 'y'
    msg = input('Elaborate?\n')
    with open('data/choicelog.txt', 'a') as wf:
        wf.write(str(time()) + f',{int(true)},"'+msg+'"\n')


def ping_alerter():
    INTERVAL = 20*60
    # INTERVAL = 10
    DATA_PATH = 'data/daylio_response_time.csv'

    send = time()
    got = run(['alerter', '-message', 'Use Daylio', '-appIcon', 'https://imgur.com/nOsmCE3.png', '-timeout 100000', '-actions', 'Done', '-closeLabel', 'Skip'], capture_output=True).stdout.decode('UTF-8')
    # Timer(INTERVAL, ping_alerter).start()
    recv = time()
    with open(DATA_PATH, 'a') as wf:
        wf.write(f'{send},{recv},{recv-send},{int(got=="Done")}\n')
    # print(send, recv, recv-send, got)

# if __name__ == '__main__':
    # ping_alerter()

