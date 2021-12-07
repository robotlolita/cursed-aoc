from functools import reduce

def make_binary_table(name, n, op):
  output = """export type {0}<A extends number, B extends number> = {{
  [index: number]: {{ [index: number]: number }};
  """.format(name)
  for i in range(0, n):
    output += "  {0}: {{\n".format(i)
    for j in range(0, n):
      output += "    {0}: {1};\n".format(j, op(i, j))
    output += "  };\n"
  output += "}[A][B];\n"
  return output

def make_parse_table(n):
  output = """export type ParseInt<S extends string> = {
  [index: string]: number;
  """
  for i in range(0, n):
    output += "  '{0}': {1};".format(i, i)
  output += "}[S];"
  return output

def make_valid_numbers(n):
  numbers = reduce(lambda a, b: "{0} | '{1}'".format(a, b), range(1, n), "'0'")
  output = "export type ValidNumber = {0};".format(numbers)
  return output
  

def store(name, contents):
  with open(name, 'w') as f:
    f.write(contents)

store("source/prelude/add.ts", make_binary_table("Add", 300, lambda x, y: x + y))
store("source/prelude/sub.ts", make_binary_table("Sub", 300, lambda x, y: max(-1, x - y)))
store("source/prelude/parse-int.ts", make_parse_table(300))
store("source/prelude/ints.ts", make_valid_numbers(300))
