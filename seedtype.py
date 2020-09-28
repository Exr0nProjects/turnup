from abc import ABC, abstractmethod         # https://www.python-course.eu/python3_abstract_classes.php
from enum import Enum, auto
from typing import Callable, Iterable, Any  # https://stackoverflow.com/a/39624147/10372825

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
    def accumule(self, acctype: AccumulationType, data: Iterable[AccumulationType]):     # TODO: the Any types should be self https://github.com/python/typing/issues/271
        '''Take two instances of self and
        return another self, the combination'''
        pass

class Time(Seedshape):
    '''Seedshape for a time'''
    def __init__(self, since_epoch):
        self.time = since_epoch

    @property
    def data(self):
        return self.time % 86400    # time in a day

    # @classmethod
    # def factory(self, acctype):
    #     if acctype is AccumulationType.SUM:
    #         raise TypeError("Cannot SUM times")
    #     elif acctype is AccumulationType.MEDIAN:
    #         pass # TODO: am i really going to chain elifs like this??
    #         # also, how do you even calculate median from one thing? Do i need to pass it an entire list?
    @classmethod
    def accumule(self, acctype, data):
        if acctype is AccumulationType.MEDIAN:
            return sorted(acctype)[len(acctype)/2]  # TODO: horribly inefficient
        elif acctype is AccumulationType.AVERAGE:
            return sum(acctype) / len(acctype)      # TODO: also horribly inefficient
        else:
            raise TypeError(f"Invalid operation {str(acctype)} on times")

