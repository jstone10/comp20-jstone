
import json

data = open('redstations.txt', 'r')


labels = data.readline()
labels = [item.strip() for item in (labels.strip()).split('|')]
junk = data.readline()

stations = []

for line in data:
    col = [item.strip() for item in (line.strip()).split('|')]
    station = {}
    for i in range(len(labels)):
        station[labels[i]] = col[i]
    stations.append(station)
data.close()

f = open('stations', 'w')

jsonData = json.dump(stations, f)