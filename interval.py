from threading import Timer
from datetime import datetime as dt, timedelta
from enum import Enum, auto

class IntervalType(Enum):
    ABSOLUTE = auto()
    RELATIVE = auto()

def print_time():
    print('noop called at', dt.now())

def absolute(interval, callback, target=dt.now()):
    if target <= dt.now():
        callback()
        target += interval
    print("next at ", target, "after", target-dt.now())
    Timer((target-dt.now()).total_seconds(), absolute,
            (interval, callback, target)).start()

def relative(interval, callback):
    Timer(interval.total_seconds(), relative,
            (interval, callback)).start()
    callback()

