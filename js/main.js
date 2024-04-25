(function($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});
	/*$('#news').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});*/

	$('#testimonial-slider').owlCarousel({
		loop:true,
		margin:15,
		dots : true,
		nav: false,
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});
	//
	if(window.location.pathname.indexOf("/events/") != -1){
		getEventsDetails();
	}else{
		getHomeEvents();
		initcontactus();
		initAdhesion();
		subscribe();
		//showfeedpopup();
	}
	
	

})(jQuery);
function showfeedpopup(){
	if(window.location.pathname=="/" || window.location.pathname== "/home"){
		setTimeout(function(){ $("#feedspopupmodal").modal("show"); }, 5000);
		
	}
	
	
}
function initAdhesion(){
	$('#situation').change(function() {
		debugger
		if(this.value=="student"){
				$(".prosection").css("display","none");
				$(".studentsection").css("display","block");
				$("#pricetag").text("10 DT");
		}else if (this.value=="pro"){
				$(".prosection").css("display","block");
				$(".studentsection").css("display","none");
				$("#pricetag").text("25 DT");
		}else{
			$(".prosection").css("display","none");
			$(".studentsection").css("display","none");
			$("#pricetag").text("25 DT");
		}
	});
}
function subscribe(){
	$("#subscribebtn").click(function(){
		
		var data={
			
			"email":$("#subscribeemail").val()
			
		}

		$.ajax({
			url: 'https://arsii.org/subscribe',
			
			error: function(err) {
				$("#subscribesucees").hide();
				$("#subscribeerror").show();
			   console.log(err)
			},
			success: function(data) {
				$('#subscribeemail').val("");
				

				$("#subscribeerror").hide();
			   $("#subscribesucees").show();

			   
			},
			data:data,
			type: 'GET'
		 });

	})
}
function initcontactus(){
	$("#contactbtn").click(function(){
		
		var data={
			"name":$("#contactname").val(),
			"email":$("#contactemail").val(),
			"subject":$("#contactsubject").val(),
			"message":$("#contactmsg").val()
		}

		$.ajax({
			url: 'https://arsii.org/contactUs',
			
			error: function(err) {
				$("#contactsucees").hide();
				$("#contacterror").show();
			   console.log(err)
			},
			success: function(data) {
				$('#contactname').val("");
				$('#contactemail').val("");
				$('#contactsubject').val("");
				$('#contactmsg').val("");

				$("#contacterror").hide();
			   $("#contactsucees").show();

			   
			},
			data:data,
			type: 'GET'
		 });

	})
}
function drawformationsSection(events){
	 
	$("#formationssection").empty();
	for(var x in events){
		//moment.locale("fr"); 
		var cdate=moment(events[x]["date"]).format('LLL');
		var newlabel="";
		var newclass=""
		if(events[x]["showfirst"]==1){
			newlabel="<span style='position: absolute;padding: 10px;' class='label label-success pulse'>Nouveau</span>"
			newclass="pulse";
		}
			$("#formationssection").append(
				'<div class="col-md-4">'
					+'<div style="    border: 1px solid #ddd;" class="blog '+newclass+'">'
					+newlabel
						+'<div class="blog-img">'
						+'<img class="img-responsive imglatestnews" src="./uploads/'+events[x]["photo"]+'" alt="arsii">'
						+'</div>'
						+'<div class="blog-content">'
						+'<h3>'+events[x]["title"]+'</h3>'
						+'<ul class="blog-meta">'
						+'<li><i class="fa fa-user"></i>'+events[x]["assured_by"]+'-<span style="font-size:10px;color:#888;">'+events[x]["assured_by_title"]+'</span></li>'
								+'<li><i class="fa fa-clock-o"></i>'+cdate+'</li>'
								+'<li><i class="fa fa-map-marker"></i>'+events[x]["location_address"]+'</li>'
								+'</ul>'
								
								/*+'<p class="desc4line">'+events[x]["description"]+'</p>'*/
								+'<a href="/trainings/'+events[x]["id"]+'">Voir détails</a>'
								+'</div>'
								+'</div>'
								+'</div>')
	}
}
function drawEventsSection(events){
	 
	$("#evtsection").empty();
	for(var x in events){
		
		var cdate=moment(events[x]["date"]).format('LLL');
		var newlabel="";
		var newclass=""
		if(events[x]["showfirst"]==1){
			newlabel="<span style='position: absolute;padding: 10px;' class='label label-success pulse'>Nouveau</span>"
			newclass="pulse";
		}
			$("#evtsection").append(
				'<div class="col-md-4">'
					+'<div class="blog '+newclass+'">'
					+newlabel
						+'<div class="blog-img">'
						+'<img class="img-responsive imglatestnews" src="./uploads/'+events[x]["photo"]+'" alt="arsii">'
						+'</div>'
						+'<div class="blog-content">'
						+'<h3>'+events[x]["title"]+'</h3>'
						+'<ul class="blog-meta">'
								
								+'<li><i class="fa fa-clock-o"></i>'+cdate+'</li>'
								+'<li><i class="fa fa-map-marker"></i>'+events[x]["location_address"]+'</li>'
								+'</ul>'
								
								/*+'<p class="desc4line">'+events[x]["description"]+'</p>'*/
								+'<a href="/events/'+events[x]["id"]+'">Voir détails</a>'
								+'</div>'
								+'</div>'
								+'</div>')
	}
}

function drawNewsSection(newsevents,newsformation){
		if(newsevents.length>0 || newsformation.length>0){
			$("#news").empty();
			for(var i in newsevents){
				//$("#news").append('<img class="img-responsive newsslider" src="./uploads/'+newsevents[i]["photo"]+'" alt="arsii">')
				$("#news").append('<div class="item">'
				+'<img class="img-responsive newsslider" src="./uploads/'+newsevents[i]["photo"]+'" alt="arsii">'
				  +'<div class="newsText">'
				  +'<h4>'+newsevents[i]["title"]+'</h4></div>'
				 
				  
				+'</div>')
			}
			for(var i in newsformation){
				//$("#news").append('<img class="img-responsive newsslider" src="./uploads/'+newsformation[i]["photo"]+'" alt="arsii">')
				$("#news").append('<div class="item">'
				+'<img class="img-responsive newsslider" src="./uploads/'+newsformation[i]["photo"]+'" alt="arsii">'
				  +'<div class="newsText">'
				  +'<h4>'+newsformation[i]["title"]+'</h4></div>'
				  
				+'</div>')
			}
		}
		$('#news').owlCarousel({
			items:1,
			loop:true,
			margin:15,
			nav: true,
			navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			dots : true,
			autoplay : true,
			animateOut: 'fadeOut'
		});
}
function viewYoutubeVideo(videourl){
	
		var previewVideo=videourl;
		if(videourl && videourl != "" ){
		  if( videourl.indexOf("youtube")!= -1){
			var u = videourl.split("v=")[1];
			if(u && u.indexOf("&")!= -1){
			  u=u.split("&")[0];
			}
			previewVideo="https://www.youtube.com/embed/"+u;
		  }else{
			previewVideo=videourl;
		  }
		  
		}
		return previewVideo;
	  
}
function drawMediaSection(media){
	if(media.length>0){
		$(".mediavideo").empty();
		$(".mediaphoto").empty();
		for(var i in media){
			if(media[i]["video"]){

				var videourl=viewYoutubeVideo(media[i]["video"])
				$(".mediavideo").append('<div class="col-md-4 col-xs-6 work">'
						
				+'<iframe width="100%" height="255"'
					+'src="'+videourl+'">'
				+'</iframe>'
				/*+'<div class="overlay"></div>'
				+'<div class="work-content">'
					
					+'<h3>'+media[i]["name"]+'</h3>'
					+'<div class="work-link">'
						
						+'<a target="_blank" href="'+videourl+'"><i class="fa fa-search"></i></a>'
					+'</div>'
				+'</div>'*/
			+'</div>')
			}else{
				$(".mediaphoto").append('<div class="col-md-3 col-xs-6 work">'
						+'<img class="img-responsive" src="./uploads/'+media[i]["photo"]+'" alt="arsii">'
						+'<div class="overlay"></div>'
						+'<div class="work-content">'
							
							+'<h3>'+media[i]["name"]+'</h3>'
							+'<div class="work-link">'
								
								+'<a class="lightbox" href="./uploads/'+media[i]["photo"]+'"><i class="fa fa-search"></i></a>'
							+'</div>'
						+'</div>'
					+'</div>')
			}
		}
	
	
	}
}

function drawOffersSection(events){
	 
	/*$("#Stagesection").empty();
	$("#Boursessection").empty();
	$("#PFAsection").empty();
	$("#PFEsection").empty();
	$("#Emploiesection").empty();
	$("#Thesesection").empty();
	$("#Mastersection").empty();
	for(var x in events){
		
		var cdate=moment(events[x]["date"]).format('LL');
		
	var newlabel="<span style='position: absolute;padding: 10px;right:10px;background:#1cbcb0;' class='label label-success pulse'>Nouveau</span>"
			var newclass="pulse";

	$("#"+events[x]["type"]+"section").append('<div class="col-md-4 col-sm-6">'
						+'<div class="service '+newclass+'">'
						+newlabel
						+'<h3>'+events[x]["title"]+'</h3>'
						+'<ul class="blog-meta">'
							+'<li style="margin-bottom:10px;" ><i class="fa fa-map-marker"></i>'+events[x]["employer"]+'</li>'
							+'<li style="margin-bottom:10px;" ><i class="fa fa-clock-o"></i>'+events[x]["duration"]+'</li>'
							+'<li style="margin-bottom:10px;"><i class="fa fa-calendar"></i>'+cdate+'</li>'
						+'</ul>'
						+'<a href="https://arsii.org/admin/home" title="Read more" class="read-more" >Voir détails<i style="position: relative;font-size: 16px;margin-left: 5px;"class="fa fa-angle-double-right ml-2"></i></a>'
						+'</div>'
					+'</div>');
			
	}*/

	$("#oppsection").empty();
	for(var x in events){
		
		var cdate=moment(events[x]["date"]).format('LL');

		var isnew=false;
		if(moment().diff(events[x]["date"], 'days')<=0){
			isnew=true;

		}
		var newlabel="";
		var newclass=""
		var oppphoto="";
		var label="";
		label=events[x]["type"];
		if(events[x]["type"]=="PFE"){
			oppphoto="https://arsii.org/public/arsii/pfe.jpg";
			label="Sujets de PFE";
		}else if(events[x]["type"]=="Stage"){
			oppphoto="https://arsii.org/public/arsii/stages.jpg";
			label="Offres de stages";
		}else if(events[x]["type"]=="Emploie"){
			oppphoto="https://arsii.org/public/arsii/emploie.jpg";
			label="Offres d'emploi ";
		}else if(events[x]["type"]=="These"){
			oppphoto="https://arsii.org/public/arsii/recherche.jpg";
			label="Sujet de recherche ";
		}else{
			oppphoto="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX10761461.jpg"
		}
		
		if(isnew){
			newlabel="<span style='position: absolute;padding: 10px;' class='label label-success pulse'>Nouveau</span>"
			newclass="pulse";
			
		}
			$("#oppsection").append(
				'<div class="col-md-4">'
					+'<div class="blog '+newclass+'">'
					+newlabel
						+'<div class="blog-img">'
						+'<img class="img-responsive imglatestnews" src="'+oppphoto+'" alt="arsii">'
						+'</div>'
						+'<div class="blog-content">'
						+'<h3>'+events[x]["title"]+'</h3>'
						+'<ul class="blog-meta">'
								
								+'<li><i class="fa fa-calendar"></i>'+cdate+'</li>'
								+'<li><i class="fa fa-clock-o"></i>'+events[x]["duration"]+'</li><br>'
								//+'<li><i class="fa fa-map-marker"></i>'+events[x]["employer"]+'</li><br>'
								+'<li><i class="fa fa-briefcase"></i>'+label+'</li>'
								+'</ul>'
								
								
								+'<a href="https://arsii.org/membre/opportunities">Voir détails</a>'
								+'</div>'
								+'</div>'
								+'</div>')
	}
}
function getHomeEvents(){
    $.ajax({
        url: 'https://arsii.org/getHomeEvents',
        
        error: function(err) {
			$("#preloader").delay(600).fadeOut();
           console.log(err)
        },
        success: function(data) {
			$("#preloader").delay(600).fadeOut();
			moment.locale("fr"); 
		   console.log(data)
		   drawEventsSection(data.events)
		   drawformationsSection(data.formations)
		   drawNewsSection(data.newsevents,data.newsformation)
		   drawMediaSection(data.media)
		   drawOffersSection(data.offers)
           
        },
        type: 'GET'
     });
}
function getEventsDetails(){
    
}
