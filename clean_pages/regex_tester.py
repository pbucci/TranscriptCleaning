# regex_tester.py
import re
string = "<h1>OK</h1>"
regex_scrub = [re.sub(r'<.*?>','',string)]
print(regex_scrub)


s = "Copy: Content and Programming Copyright 2004 Fox News Network, L.L.C. ALL RIGHTS RESERVED. Transcription Copyright 2004 eMediaMillWorks, Inc. (f/k/a Federal Document Clearing House, Inc.), which takes sole responsibility for the accuracy of the transcription. ALL RIGHTS RESERVED. No license is granted to the user of this material except for the user's personal or internal use and, in such case, only one copy may be printed, nor shall user use any material for commercial purposes or in any fashion that may infringe upon Fox News Network, L.L.C.'s and eMediaMillWorks, Inc.'s copyrights or other proprietary rights or interests in the material. This is not a legal transcript for purposes of litigation."
print("ALL RIGHTS RESERVED" in s)