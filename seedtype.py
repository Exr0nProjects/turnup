from abc import ABC, abstractmethod # https://www.python-course.eu/python3_abstract_classes.php

class Seedshape:
    '''Seedshape - base class for seed shapes
    data snippets that can be combined and analyzed'''
    @classmethod
    @abstractmethod
    def accumulator(self, lhs, rhs):
        '''Take two instances of self and
        return another self, the combination'''
        pass



