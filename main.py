from datetime import datetime as dt
import interval
from plugins import intervals

if __name__ == '__main__':
    for data in intervals.values():
        if data['type'] is interval.IntervalType.ABSOLUTE:
            interval.absolute(data['interval'], data['callback'])
        elif data['type'] is interval.IntervalType.RELATIVE:
            interval.relative(data['interval'], data['callback'])

