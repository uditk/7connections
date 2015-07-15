// FORCE CLEAR AJAX CACHE 
// $.ajaxSetup({ cache: false });

// TEST FOR MOBILE
var isMobile = {
    any: function() {
    	return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	}
};

// SET VARS
var checkOpen = 0;
	message = 1;
	scrollTop = 0;
	elementOffset = 0;  
	distance = 0;
	
	
// FUNCTIONS
function pickMessage(){
	$('#chat div.chat-1 p').removeClass('highlight');
	$('#chat div.chat-2 p').removeClass('highlight');
	$('#chat div.chat-3 p').removeClass('highlight');
	$('#chat div.chat-4 p').removeClass('highlight');
	
	if(message < 4) {
		message += 1;
	}
	else {
		message = 1;	
	};
	$('#chat div.chat-'+message+' p').addClass('highlight');

};

function animateLogo() {
    $('#jar-lid-shadow').toggleClass('open');
	$('#jar-lid').toggleClass('open');
	$('#chat').toggleClass('open');
	if(!checkOpen){
		checkOpen = 1;
		pickMessage();
	}else{
		checkOpen = 0;
	};
}

function doTada() {
	if(!checkOpen){
		$('#logo').addClass('animated tada');
	};
	
	setTimeout(function() {
		$('#logo').removeClass('animated tada');	
	}, 2000);
}
	
function firstReveal() {
	
	if ($(window).scrollTop() < 300){	
    	animateLogo();	
    	setTimeout(function() {
	    	if(checkOpen){
				animateLogo();
			}	
		}, 3600);
		
	}
}

function closeCaseStudy(client) {

	$('div.'+client+' .portfolio-content').remove();
	$('div.'+client).addClass('closed');
	if(client == 'shhh'){
		$('div .'+client+' .portfolio-header h4').text( 'Break the Seal' );
	}
	else {
    	$('div .'+client+' .portfolio-header h4').text( 'Pop the Lid' );
	}		
} 

function closeEverything(client) {

	$('div.portfolio-content').remove();
	$('div.portfolio-item').addClass('closed');
	if(client == 'shhh'){
		$('div .'+client+' .portfolio-header h4').text( 'Break the Seal' );
	}
	else {
    	$('div .'+client+' .portfolio-header h4').text( 'Pop the Lid' );
	}		
} 

function resizeContent(client) {
	
	$('.'+client+' .portfolio-content').find('img[data-src]').each(function(img){
		$(this).attr("data-load", "true");
		ImageLoader.load(this);	
	});

	var newHeight = $('.'+client+" .portfolio-content").height() + $('.'+client+" .portfolio-header").height() + 240;
	$('div.'+client).css({ height: newHeight});

} 
 
function loadMobileCaseStudy(client) {

	$('div.'+client+' .loader').css({ opacity: 1 });
	switch (client) {

		case "umall":		
			var url = '/portfolio/2014/2/6/university-mall?format=json';
			break;
			
		case "gmm":		
			var url = '/portfolio/2014/1/31/green-mountain-mustard?format=json';
			break;
			
		case "juil":		
			var url = '/portfolio/2014/4/21/juil?format=json';
			break;
			
		case "ck":		
			var url = '/portfolio/2014/4/28/calvin-klein?format=json';
			break;
			
		case "shhh":		
			var url = '/portfolio/2014/4/28/top-secret?format=json';	
	};
	
	$('div.portfolio-content').remove();
    $('div.portfolio-item').addClass('closed');
    $('div .portfolio-header-frame h4').text( 'Pop the Lid' );
    $('div.shhh .portfolio-header-frame h4').text( 'Break the Seal' );
    $('div.'+client+' .portfolio-header-frame h4').text( 'Save for Later' );
	$('div.'+client).removeClass('closed');
		
	
	$.getJSON(url).done(function(data) {
	
		var post =  '<div class="portfolio-content"><div class="frame">' + data.item.body + '<h4 class="expand">Save for Later</h4></div>';
		
		$('div .'+client).append(post);
		
		$('div .'+client+' .portfolio-content h4').click(function(){
			$.smoothScroll({scrollTarget: '.'+client});
			setTimeout(function() {
				$('div .portfolio-header-frame h4').text( 'Pop the Lid' );
				$('div.shhh .portfolio-header-frame h4').text( 'Break the Seal' );
				closeEverything (client);	
			}, 300);
		});
		
		resizeContent(client);
		$('.slide a').addClass('fancybox');
		$(".fancybox").fancybox();
		$('div.'+client+' .loader').css({ opacity: 0 });

	});
	
	setTimeout(function() {
		$.smoothScroll({scrollTarget: '.'+client});	
	}, 400);	

}

function loadCaseStudy(client) {

	$('div.'+client+' .loader').css({ opacity: 1 });
	
	switch (client) {

		case "umall":		
			var url = '/portfolio/2014/2/6/university-mall?format=json';
			break;
			
		case "gmm":		
			var url = '/portfolio/2014/1/31/green-mountain-mustard?format=json';
			break;
			
		case "juil":		
			var url = '/portfolio/2014/4/21/juil?format=json';
			break;
			
		case "ck":		
			var url = '/portfolio/2014/4/28/calvin-klein?format=json';
			break;
			
		case "shhh":		
			var url = '/portfolio/2014/4/28/top-secret?format=json';	
	};
	
    $('div.'+client+' .portfolio-header-frame h4').text( 'Save for Later' );
	$('div.'+client).removeClass('closed');
		
	
	$.getJSON(url).done(function(data) {
	
		var post =  '<div class="portfolio-content"><div class="frame">' + data.item.body + '<h4 class="expand">Save for Later</h4><div class="close-btn">X</div></div>';
		
		$('div .'+client).append(post);
		
		// Move Close Button
		myClient = client;
		$(window).on("scroll", function() {
			
		
		    scrollTop = $(window).scrollTop();
		    elementOffset = $('div .'+myClient).offset().top;  
		    distance = (scrollTop - elementOffset)-260;
		    
		    if(distance > 100) {
		    	
			    $('div .'+myClient+' .portfolio-content .close-btn').css({"top":""+distance+"px"});
		    } else {
			    $('div .'+myClient+' .portfolio-content .close-btn').css({"top":"100px"});
		    }
			
			
		});
		
		$('div .'+client+' .portfolio-content h4, div .'+client+' .portfolio-content .close-btn').click(function(){
			$.smoothScroll({scrollTarget: '.'+client});
			setTimeout(function() {
				closeCaseStudy (client);	
			}, 300);
		});
		
		resizeContent(client);
		$('.slide a').addClass('fancybox');
		$(".fancybox").fancybox();
		$('div.'+client+' .loader').css({ opacity: 0 });

	});
		

}

// WINDOW RESIZE	
$(window).resize( function(){

	if( isMobile.any() ) {
		$('div.portfolio-content').remove();
		$('div.portfolio-item').addClass('closed');
		$('div .portfolio-header-frame h4').text( 'Pop the Lid' );
		$('div.shhh .portfolio-header-frame h4').text( 'Break the Seal' );
		//$.smoothScroll({scrollTarget: 0});
	} else {
		$('div.portfolio-item').each(function(){
			if(!$(this).hasClass('closed')){
				var client = $(this).attr('class').split(' ')[0];
				resizeContent(client);
			}
		});
	}
	
});

	
// ON LOAD
$(window).load(function() {

	// SCRIPT FOR MOBILE
	if( isMobile.any() ) {

		// SCROLL TARGETS
		$('#main-nav a').smoothScroll({offset: 170});
		$('#main-nav .work a').smoothScroll({offset: 120});
		$('#main-nav .contact a').smoothScroll({offset: 60});
		$('#process-nav .home a').smoothScroll({offset: -100});
		$('#process-nav .work a').smoothScroll({offset: 120});
		$('#process-nav .contact a').smoothScroll({offset: 60});
		$('#work-nav .home a').smoothScroll({offset: -100});
		$('#work-nav .process a').smoothScroll({offset: 170});
		$('#work-nav .contact a').smoothScroll({offset: 60});
		$('#contact-nav .home a').smoothScroll({offset: -100});
		$('#contact-nav .process a').smoothScroll({offset: 170});
		$('#contact-nav .work a').smoothScroll({offset: 120});
		
		// REVEAL BACKGROUND
		/* $('body').addClass('animated fadeIn'); */
			
		// REVEAL HEADER
		$('header').addClass('animated bounceInDown');
		
		// REVEAL TAGLINE
		$('#tagline').addClass('animated fadeInUp');
		
		// REVEAL SUBNAV
		$('#sub-nav').addClass('animated fadeInDown');
		
		// REVEAL MAIN CONTENT
		//$('#process, #work, #contact, #footer').addClass('animated fadeInUp');
		
		// REVEAL BLOG CONTENT
		$('.blog-content').addClass('animated fadeIn');
		
		
		// LOGO ANIMATIONS
		$('#logo')
	    .click(function(){
	    	animateLogo();	
	    })
	    .mouseover(function(){
		    if(!checkOpen){
				$(this).addClass('animated tada');
			};
		});
		
		// TAGLINE ANIMATIONS
		$('#tagline')
		.click(function(){
			$(this).removeClass('delay').addClass('animated hinge');
		})
		.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
			$(this).removeClass('animated hinge').addClass('delay animated fadeInUp');
	    	
		});
		
		// PORTFOLIO ANIMATIONS
		$('div.shhh h4').text( 'Break the Seal' );

		$('div.portfolio-item h4').click(function(){
	    	var client = $(this).parent().parent().parent().attr('class').split(' ')[0];
			if(!$('div.'+client).hasClass('closed')) {
	    		closeEverything (client);						
	    	}
	    	else { loadMobileCaseStudy(client); }
		        
	    });
	    

		$('h2').click(function(){
			$(this).addClass('animated bounce');
			
			setTimeout(function() {
			$('h2').removeClass('animated bounce');	
			}, 800);
		});
		
		// FORM ANIMATIONS
		$('input.button').click(function(){
			$('div.form-submission-text').addClass('animated bounceInUp');
		});
		
	} 
	
	else {
	// SCRIPT FOR DESKTOP
	
		// PARALLAX
		skrollr.init({
			smoothScrolling: true,
			smoothScrollingDuration: 400,
		});
		
		// SCROLL TARGETS
		$('#main-nav .process a').smoothScroll({offset: -130});
		$('#main-nav .work a').smoothScroll({offset: -500});
		$('#main-nav .contact a').smoothScroll({offset: -660});
		$('#process-nav .home a').smoothScroll({offset: -250});
		$('#process-nav .work a').smoothScroll({offset: -180});
		$('#process-nav .contact a').smoothScroll({offset: -340});
		$('#work-nav .home a').smoothScroll({offset: -250});
		$('#work-nav .process a').smoothScroll({offset: 280});
		$('#work-nav .contact a').smoothScroll({offset: 120});
		$('#contact-nav .home a').smoothScroll({offset: -250});
		$('#contact-nav .process a').smoothScroll({offset: 280});
		$('#contact-nav .work a').smoothScroll({offset: 420});
		
		
		// REVEAL BACKGROUND
		/* $('body').addClass('animated fadeIn'); */
		
		// REVEAL HEADER
		$('header').addClass('animated bounceInDown');
		
		// REVEAL TAGLINE
		$('#tagline').addClass('animated fadeInUp');
		
		// REVEAL SUBNAV
		$('#sub-nav').addClass('animated fadeInDown');
		
		// REVEAL MAIN CONTENT
 
		// REVEAL BLOG CONTENT
		//$('.blog-content').addClass('animated fadeIn');
	    
	    // LOGO ANIMATIONS    
	    $('#logo')
	    .click(function(){
	    	animateLogo();	
	    })
	    .mouseover(function(){
		    if(!checkOpen){
				$(this).addClass('animated tada');
			};
		})

		//setTimeout(doTada, 3000);	
		setTimeout(firstReveal, 5000);
		setInterval(doTada, 12000); 

		// TAGLINE ANIMATIONS
		$('#tagline')
		.click(function(){
			$(this).removeClass('delay').addClass('animated hinge');
		})
		.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
			$(this).removeClass('animated hinge').addClass('delay animated fadeInUp');
	    	
		});
		
		// MENU ANIMATIONS
		$('#main-nav li.process')
		.mouseover(function(){
			$('#process-highlight').addClass('show');
		})
		.mouseout(function(){
			$('#process-highlight').removeClass('show');
		});
		$('#main-nav li.work')
		.mouseover(function(){
			$('#work-highlight').addClass('show');
		})
		.mouseout(function(){
			$('#work-highlight').removeClass('show');
		});
		$('#main-nav li.contact')
		.mouseover(function(){
			$('#contact-highlight').addClass('show');
		})
		.mouseout(function(){
			$('#contact-highlight').removeClass('show');
		});
		
		// SUBNAV ANIMATIONS
		$('#sub-nav li')
		.mouseover(function(){
			$(this).addClass('animated pulse');
		})
		.mouseout(function(){
			$(this).removeClass('animated pulse');
		});
		
		$('#sub-nav')
		.bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
			$(this).removeClass('animated fadeInDown');
	    	
		});
		
		// PORTFOLIO ANIMATIONS
		$('div.shhh h4').text( 'Break the Seal' );

		$('div.portfolio-item h4').click(function(){
	    	var client = $(this).parent().parent().parent().attr('class').split(' ')[0];
			if(!$('div.'+client).hasClass('closed')) {
	    		closeCaseStudy (client);						
	    	}
	    	else { loadCaseStudy(client); }
		        
	    });
	    
		$('h2').click(function(){
			$(this).addClass('animated bounce');
			
			setTimeout(function() {
			$('h2').removeClass('animated bounce');	
			}, 800);
		});
		
	}
});


