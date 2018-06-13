
import json

data = open('redstations.txt', 'r')

labels = data.readline()
labels = [item.strip() for item in (labels.strip()).split('|')]
print(labels)
junk = data.readline()


for line in data:
    col = [item.strip() for item in (line.strip()).split('|')]

