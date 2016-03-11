/**
 * 
 */
(function(window, angular, undefined) {
	'use strict';
	
	var brokerModule = angular.module('eits.dwr-broker', []);
	
	/**
	 * 
	 */
	brokerModule.provider('$importService', function() {

		/**
		 * 
		 */
		this.url = "./broker";
		/**
		 * 
		 */
		this.interfaceUrl = this.url+"/interface";
		
		/**
		 * 
		 */
		this.options = {
			dataType: "script",
		    cache: true,
		    async: false,
		    url: null
		};
			
		/**
		 * 
		 */
	    this.$get = function( $q ) {
	    	var $self = this;
	    	
	    	//Quando carregado o script, é aplicado no objeto window (window[service]).
	    	return function( service ) {
	    		$self.options.url = $self.interfaceUrl + "/"+service+".js";
	    		
	    		var deferred = $q.defer();
	    		
	    		deferred.notify('Loading service...: '+service);
		    	
			    //Carrega dinamicamente o script
		    	$.ajax( $self.options )
		    		.done( function( data, textStatus, jqXHR ) {
		    			
		    			if ( window[service] ) {
							window[service]._path = $self.url;
							deferred.resolve( data, jqXHR );
		    			} else {
		    				deferred.reject( "Error loading broker service: "+service, data);
		    			}
		    		})
		    		.fail( function( jqXHR, textStatus, exception ) {
		    			deferred.reject( "Error loading broker service: "+service, exception);
		    		});
		    	
		    	return deferred.promise;
	    	};
	    };
	    
	    /**
	     * 
	     */
	    this.setBrokerURL = function(url) {
	    	this.url = url;
	    	this.interfaceUrl = this.url+"/interface";
	    	
	    	//http://directwebremoting.org/dwr/documentation/browser/xdomain.html
	    	window.pathToDwrServlet = this.url;
	    };
	});
	
})(window, window.angular);