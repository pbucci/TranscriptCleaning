import ast
import os
import nltk
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

# write tree to file
def write(file,text):
    for line in text:
        file.write(line)
    return True

# parse_sentence
def parse_sentence(sentence,out):
    tree = str(chunker.parse(sentence))
    write(out,tree)
    return True

# parse pape
def parse_page(path,dir):
    print('Parsing ' + path)
    with open(dir + path) as file:
        f = file.readlines()
    with open('chunked/' + path, 'w+') as out:
        for l in f:
            parse_sentence(ast.literal_eval(l),out)
    return True

# parse_in_dir
def parse_in_dir(dir):
    for file in os.listdir(dir):
        if file.endswith(".txt"):
            parse_page(file,dir)
    return True

# remember trailing slash here
parse_in_dir('../pos_tagger/pos_tagged_transcripts/')