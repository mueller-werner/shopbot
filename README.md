shopbot
=======

Commandline Amazon Shopbot

Buy stuff from cmd. This sounds like a good idea, right?

System requirements
------------------------

    * ** phantomjs:
          o http://phantomjs.org
    * ** casperjs:
          o http://casperjs.readthedocs.org

    * ** amazon account:
          o https://www.amazon.de

### Tested with Amazon.de
should work anywhere


How to use
------------------------
from commandline:

~~~ sh
$ casperjs amazon.de.js <ASIN> <AMAZON LOGIN> <PASSWORD>
~~~

### ASIN ?!

The Amazon Standard Identification Number (ASIN) is a 10-character alphanumeric unique identifier assigned by Amazon.com and its partners for product identification within the Amazon.com organization. [http://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number]

http://www.asintool.com
