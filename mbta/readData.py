with open("stops.txt", "r") as f:
	lines = f.readlines()

fields = [x.replace("\n","") for x in lines[0].split("|")]
j = []
for l in lines[2:]:
	l = l.split("|")
	d = {}
	for i in range(0,len(fields)):
		f = fields[i].replace(" ","")
		if (f != "stop_name"):
			x = l[i].replace("\n","").replace(" ","")
		else:
			x = l[i].rstrip().replace("\n","")
		d[f] = x
	j.append(d)
order = [' Alewife',' Davis',' Porter Square', ' Harvard Square', ' Central Square', 
         ' Kendall/MIT', ' Charles/MGH', ' Park Street', ' Downtown Crossing', 
         ' South Station', ' Broadway', ' Andrew', ' JFK/UMass', ' North Quincy', 
         ' Wollaston', ' Quincy Center', ' Quincy Adams', ' Braintree', 
         ' Savin Hill', ' Fields Corner', ' Shawmut', ' Ashmont']
d = {}

for i in range(0, len(order)):
	d[order[i]] = i

x = sorted(j, key=lambda x: d[x["stop_name"]])
with open("better_format.txt", "w") as f:
	f.write(str(x))