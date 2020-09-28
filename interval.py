from threading import Timer
from time import time

def print_time():
    print('noop called at', time())

def absolute(interval, callback, target=time()):
    if target <= time():
        callback()
        target += interval
    Timer(time()-target, absolute,
            (interval, callback, target)).start()

def between(interval, callback):
    Timer(interval, between,
            (interval, callback)).start()
    callback()


