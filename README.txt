DEPENDENCIES: 
=============

Base:
	NodeJS
	Don't forget npm install

For crypting:
	node-gyp
	npm install -g node-gyp

	On Windows:
		Install windows build-tools:
			npm install --global --production windows-build-tools
		
	Python 2.x [normally installed with the build-tools on windows]
	https://www.python.org/ftp/python/2.7.12/python-2.7.12.msi

===========================================================================================================

ERRORS:
=======
If error with visual studio and bcrypt, Install Visual Studio:
		https://www.visualstudio.com/products/visual-studio-community-vs
		close any cmd window before installation
		and select Common Tools for Visual C++ during setup in "custom installation".
	
	Then
		npm config set msvs_version 2015
		
If error C2373 with node-gyp when installing bcrypt
This error stays in relation with npm, node-gyp and Visual Studio 2015 and is already fixed in node-gyp@3.4.0, but npm is still pointing to an old version. 

Go to your folder where npm is installed, e.g.: C:\Program Files\nodejs\node_modules\npm
Open: package.json [on windows 10 be sure to have "full control" on this file to be allowed to edit it]
Remove entry for node-gyp in bundleDependencies
Bump version number to 3.4.0 for node-gyp in dependencies
Make a npm i in this directory to install node-gyp@3.4.0 to fix the problem
Then npm install -g node-gyp

===========================================================================================================

IMAGE UPLOAD :
==============

THE TEXT FIELDS MUST BE SENT BEFORE THE IMAGE FIELDS !!!!
Destination folder : req.body.folder [ex: "public/images/uploads"]
File name : req.body.filename	[ex: "image01" don't add any extention !] 

===========================================================================================================

PDF CREATION:
=============

Post example:
{ 
	"file" : {
		"template" : "public/documents/templates/body.hbs",
		"folder" : "public/tmp",
		"fileName" : "pdf01"
	},
	"data" : {
		"name": "John", 
		"hometown": "Somewhere, TX",
		"kids": [{
			"name": "Jimmy", 
			"age": "12"
		},{
			"name": "Sally", 
			"age": "4"
		}]
	}
}