# iFrame-Content-Load-Detector
Detects if an iframe is loaded along with content requested. 

Synopsis:

Detecting if an iframe is successfully loaded with it's content can be very challenging. Normally, this could've been easily done by just getting the HTTP headers from the URL you are trying to render in the iframe. The Cross-Origin and X-Frame-Options creates a catch 22 senario...

To see if the content can be loaded in an iframe, first we would need to see if the Cross-Origin and X-frame-Options header allows for rendering. But you can only get these headers if your are even allowed in the first place. There isn't a response you can use to see if you are not allowed. 

Solution:

Exploring the document object model of an iframe

The final solution will be browser specific. After exploring the DOM of an iframe, there is a property that can only be accessed in firefox (contentDocument). There is another one, (contentWindow), that can be accessed by all browsers but only certain non-meaningfull properties can be accessed. 

