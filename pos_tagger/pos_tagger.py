import os
#---------------------------------------------------------------------
# Runs NLTK tagger on given file
#---------------------------------------------------------------------
import nltk
pagedir = 'clean_transcripts/'
outdir = 'pos_tagged_transcripts/'

def tag_page(f):
	file = open(pagedir + f)
	out = open(outdir + f,"w+")
	for line in file:
		text = nltk.word_tokenize(line)
		tagged = nltk.pos_tag(text)
		out.write(str(tagged) + "\n")
	out.close()
	file.close()

for file in os.listdir(pagedir):
	if file.endswith(".txt"):
		print('Tagging ' + file)
		tag_page(file)