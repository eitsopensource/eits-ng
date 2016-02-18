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
	    this.$get = function() {
	    	var $self = this;
	    	
	    	return function( service ) {
	    		$self.options.url = $self.interfaceUrl + "/"+service+".js";
		    	
		    	//Carrega dinamicamente o script
		    	$.ajax( $self.options )
		    		.fail( function( jqXHR, textStatus, exception ) {
		    			console.error("Error loading broker service: "+service, "Reason: "+exception );
		    		}
		    	);
		    	
		    	//Quando carregado o script, é aplicado no objeto window (window[service]).
		    	//Atribui o path do broker
		    	window[service]._path = $self.url;
		    	
		    	//Retorna a instancia para quem solicitou (via DI)
		    	return window[service];
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