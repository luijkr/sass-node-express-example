import json
from slugify import slugify


with open("data/interactive_dictionary.json", "r") as file:
  data = json.load(file)

words = sorted(list(data.keys()))
with open("data/words.txt", "w") as file:
  file.write("\n".join(words))

# with open("data/dictionary-test.json", "w") as file:
with open("data/dictionary.json", "w") as file:
  for word in words:
    slug = slugify(word)
    definitions = data[word]
    if len(definitions) > 0:
      entry = {
        "word": word,
        "slug": slug,
        "definitions": definitions
      }
      file.write(json.dumps(entry) + "\n")
