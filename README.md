#Wordpress Onepage Tool

Use this library to only reload the container of your content for internal links.
This is done by hijacking the clicks on internal links and loading the content via ajax.

###Benefits
The library can be used with only one line of javascript and it improves the user experience a lot because the loading of new pages feels way faster.

###Restriction
It only works for sites where the only thing that differs between pages is one container.
Your site will break if you have different menus or sitebars for different pages.

##Usage
Just call the `onepage` function on your container element.

###Example
```javascript
// wait until DOM is ready
jQuery(function($) {

	// in this example the container has an ID of "main"
	$('#main').onePage();

});
```

##Options
There is currently only one option available:
* `scrollTop: true`: by default `true`; set to `false` to stay exactly at the same position of the site after loading a new page into the container

**Example:** `$('#main').onePage( { scrollTop: false } );`