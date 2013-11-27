#TSE ACTAS scraping tools

Proof of concept to see how easy is to get the HN 2013 presidential elections "actas".

##Requirements

node.js

Node can be installed using brew. To install brew run the following command in the terminal:

`$ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"`

Once installed you can install node by running:

`$ brew install node`

Run `$node -v` and `$npm -v` to confirm that you have everything needed.

##Setup

`$ npm install`

This setups all the scripts dependencies

##Use


`$ START_ACTA=16000 END_ACTA=16100 POLL=1 node server.js`

START_ACTA is which acta to start with. Default is 1.
END_ACTA is which acta we will end with. MAX Default is 16135.
POLL in seconds time before each poll/request. Default is 2. Don't get greedy and make this to small.

###Deamon

`nohup START_ACTA=16000 END_ACTA=16100 POLL=1 node server.js > output.log &`

#Disclamier

Use this software at your own risk. This is a proof of concept for learning purposes and therefore I'm not responsible
of anything you do with it :).


#License

The MIT License (MIT)

Copyright (c) 2013 Geries Handal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.




