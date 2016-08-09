'use strict';

// Register `phoneList` component, along with its associated controller and template

angular.
  module('abakusNav').
  component('sideNav', {
    template: 
        '<nav>' +
            '<ul>' +
                '<li class="h1Border">' +
                    '<h1 id="factures"><a href="#">{{title}}</a></h1>' +
                '</li>' +
                '<li id="factures"><a href="#/client/invoice/list">Factures</a></li>' +
                '<li id="devis"><a href="#/client/estimate/list">Devis</a></li>' +
                '<li id="setting"><a href="#/client/profile/infos">Mon compte</a></li>' +
            '</ul>' +
        '</nav>',
    controller: function abakusControllers() {
      this.user = 'world';
    console.log(this.user);
    }

  });