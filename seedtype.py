from abc import ABC, abstractmethod # https://www.python-course.eu/python3_abstract_classes.php
from enum import Enum, auto
from typing import Callable, Any    # https://stackoverflow.com/a/39624147/10372825

class AccumulationType(Enum):
    SUM         = auto()
    AVERAGE     = auto()
    MEDIAN      = auto()

class Seedshape:
    '''Seedshape - base class for seed shapes
    data snippets that can be combined and analyzed'''
    @abstractmethod
    def __init__(self):
        pass

    @property
    @abstractmethod
    def data(self):
        pass

    @classmethod
    @abstractmethod
    def accumulator(self, acctype: AccumulationType
            ) -> Callable[[Any, Any], Any]:     # TODO: the Any types should be self https://github.com/python/typing/issues/271
        '''Take two instances of self and
        return another self, the combination'''
        pass

class Time(Seedshape):
    '''Seedshape for a time'''
    def __init__(self, since_epoch):
        self.time = since_epoch

    @property
    def data(self):
        return self.time

    @classmethod
    def factory(self, acctype):
        if acctype is AccumulationType.SUM:
            raise TypeError("Cannot SUM times")
        elif acctype is AccumulationType.MEDIAN:
            pass # TODO: am i really going to chain elifs like this??
            # also, how do you even calculate median from one thing? Do i need to pass it an entire list?



