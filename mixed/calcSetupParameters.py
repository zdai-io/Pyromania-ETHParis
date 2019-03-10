alpha = 0.999892503784850936
A_0 = 1000000


from math import sqrt, ceil

def calcTokenSetup(A, S):
  pi = A/S
  a = int(1/(sqrt(1/(1-alpha)) - sqrt(alpha/(1-alpha))) * sqrt(pi) * sqrt(sqrt(A/A_0))*1e18)
  kappa_0 = int(pi*10*1e18)
  w = S * int(1e17)
  return (a, kappa_0, w)

token_list = [
["CAT", "BitClave", 1183110.6, 2000000000, "0x1234567461d3f8db7496581774bd869c83d51c93"],
#["ASTS", "Authorship", 42249, 100000000, "0x2dAEE1AA61D60A252DC80564499A69802853583A"],
["TNS", "Transcodium", 204993, 88600000, "0xb0280743b44bf7db4b6be482b2ba7b75e5da096c"],
#["TRST", "Trustcoin", 1200204, 100000000, "0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b"],
["BCS", "BCShop.io", 685000, 10000000, "0x98bde3a768401260e7025faf9947ef1b81295519"],
["AC", "Aeternity", 120344121, 273685830, "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]
]




res=[]

for row in token_list:
  r = calcTokenSetup(row[2], row[3])
  res.append([row[0], row[4], str(r[0]), str(r[1]), str(r[2])])

print(res)