# someday I want to have generic tagging for both this and daylio

data_path = './autotrack/data/toggl_time_entries_2020_01_01_to_2020_10_07.csv'

import numpy as np
import pandas as pd

data = pd.read_csv(data_path)

print(data.groupby('Description'))
