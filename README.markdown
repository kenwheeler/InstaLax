# InstaLax: Panel Based Parallax Framework #
[https://github.com/kdubbicles/InstaLax/](https://github.com/kdubbicles/InstaLax)

Version: 1.0pre, Last updated: 04/04/2013

InstaLax lets developers render panel based sliding parallax experiences using data attributes and HTML 

## Getting Started ##

Add the scroller div

	<div id="scroller"></div>

Define your container with a section tag below:

	<div id="scroller"></div>

	<section id="instalax">

	</section>

Add a div with the class 'slide':

	<div id="scroller"></div>

	<section id="instalax">
		<div class="slide" data-fade="true" data-noslide="true">

        </div>
	</section>

Inside, add a background div with the class bg, and an img tag inside:

	<div id="scroller"></div>

	<section id="instalax">
		<div class="slide" data-fade="true" data-noslide="true">
			<div class="bg">
	            <img src="images/background.jpg"/>
	        </div>
	    </div>
	</section>

Optionally, add a div for content and fill it with what you'd like. The attribute data-width is required:

	<div id="scroller"></div>

	<section id="instalax">
		<div class="slide" data-fade="true" data-noslide="true">
			<div class="bg">
	            <img src="images/background.jpg"/>
	        </div>
	        <div class="content" data-width="400" data-start="center" data-stop="top" data-fade="out">
	            <h1>Hello World</h1>
	        </div>
        </div>
	</section>

Continue adding slides and be amazing

The .slide tag has the following options:

*	data-fade: true || null

*	data-noslide: true || null

The .content tag has the following options

*	data-width: integer (required)

*	data-start: center || top || bottom

*	data-stop: center || top || bottom

*	data-fade: in || out

## Examples ##

Demo:

[http://dubmediagroup.com/InstaLax](http://dubmediagroup.com/InstaLax)

## Release History ##

1.0pre   - (04/04/2013) Pre-Initial release

## License ##
Copyright (c) 2011 Ken Wheeler
Licensed under the MIT and GPL licenses.

Free as in Bacon.