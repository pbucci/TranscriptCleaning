import nltk

def write(file,text):
    for line in text:
        file.write(line)

# This grammar is described in the paper by S. N. Kim,
# T. Baldwin, and M.-Y. Kan.
# Evaluating n-gram based evaluation metrics for automatic
# keyphrase extraction.
# Technical report, University of Melbourne, Melbourne 2010.
grammar = r"""
    NBAR:
        # Nouns and Adjectives, terminated with Nouns
        {<NN.*|JJ>*<NN.*>}

    NP:
        {<NBAR>}
        # Above, connected with in/of/etc...
        {<NBAR><IN><NBAR>}
"""

chunker = nltk.RegexpParser(grammar)
sentence = [('Hi', 'NNP'), (',', ','), ('I', 'PRP'), ("'m", 'VBP'), ('Bill', 'NNP'), ("O'Reilly", 'NNP'), ('.', '.'), ('Thanks', 'NNS'), ('for', 'IN'), ('watching', 'VBG'), ('us', 'PRP'), ('tonight', 'NN'), ('on', 'IN'), ('our', 'PRP$'), ('first', 'JJ'), ('edition', 'NN'), ('of', 'IN'), ('2003', 'CD'), ('.', '.'), ('Happy', 'JJ'), ('New', 'NNP'), ('Year', 'NNP'), ('.', '.')]
tree = str(chunker.parse(sentence))
out = open('chunk_tester.txt','w+')
print(tree)
write(out,tree)