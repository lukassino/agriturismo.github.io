function get_events(tempo, container) {
	$(container).html('');

	$.ajax({
		url: '/news-events/eventlist.php?date=' + tempo,
		type: 'GET',
		dataType: 'jsonp',
		jsonpCallback: 'MyJSONPCallback',
		success: function(data){
			append_events_list(data, container);
			if (tempo!='past') {
				get_events('past', '#past_events');
			} else {
				//finalizza gli eventi passati
				complete_past_events(data);
			}

		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

function complete_past_events(data) {
	var anni = [];
	for (var i in data) {
		var a = data[i].data.slice(-4);
		if (anni.indexOf(a)<0) {
			$('.past_years').append(
				$('<li>').append(
					$('<a href="#">').html(a)
				)
			);
			anni.push(a);
		}
	}
	$('footer .past_years').css('display', 'none');
	$('#past_events article[data-year]').css('display', 'none');
	//$('#past_events article[data-year=2016]').css('display', 'block');

	$('.past_years a').click(function(e) {
        e.preventDefault();
		var anno = $(e.target).html();
		$('#past_events article[data-year]').css('display', 'none');
		$('#past_events article[data-year=' + anno + ']').css('display', 'block');
		$('footer .past_years').css('display', 'block');
		$('.past_years a').css('color', 'darkorange');
		$('.past_years a:contains("'+ anno + '")').css('color', 'white');
		var s = $('header .past_years');
		$('html, body').animate({
			scrollTop: $('header .past_years').offset().top - $('#header').height() - 20
		}, 1000);
    });
	events_loaded();
}


function append_events_list(data, container) {
	for (var i in data) {
		var r = $('<div class="row uniform">');
		
		var t = $('<div class="3u 12u(medium)">');
		if (data[i].foto>'') {
			var ta = $('<img>').attr("src", "/news-events/images/" + data[i].foto);
			if (data[i].locandina) {
				t.append( $('<a class="image fit">').attr('href', "/news-events/locandine/" + data[i].foto).append(ta) );
			} else {
				t.append(ta.addClass('image fit') );
			}
		}
		r.append(t);
		
		var ttt = $('<div class="9u 12u(medium)">');
		var tt = $('<div class="row">');
		t = $('<div class="6u 12u(medium)">');
		var s = '<span class="icon fa-paperclip">&nbsp;</span>' + data[i].luogo + '<time><div class="giorno">' + data[i].data + '</div>';
		if (data[i].orario) s += '<div class="orario">' + data[i].orario + '</div>';
		s += '</time>'
		t.append( s );
		tt.append(t);
		tloc = $('<div class="6u 12u(medium)">');
		if (data[i].location) tloc.append( '<div><strong>' + data[i].location + '</strong></div>' );
		if (data[i].indirizzo) tloc.append( '<div><span class="icon fa-map-marker">&nbsp;</span><i>' + data[i].indirizzo + '</i></div>' );

		//tloc.append( '<div><span class="icon fa-home">&nbsp;</span><strong>' + data[i].location + '</strong><br><i>' + data[i].indirizzo + '</i></div>' );
		tt.append(tloc);

		ttt.append(tt);
		ttt.append( $('<h3>').html(data[i].titolo) );
		ttt.append( $('<p>').html(data[i].descrizione) );
		
		
		tt = $('<article class="box">').attr('id', 'event' + data[i].id).attr('data-year', data[i].data.slice(-4));
		if (data[i].link) {
			t = $('<a>').attr('href', data[i].link).attr('target', '_blank');
			if (data[i].link.substr(0, 4) == 'http') {
				if (data[i].link.indexOf('facebook')>=0) {
					t.html(' segui su facebook').addClass('icon fa-facebook-square');
				} else {
					t.html(' visita il sito').addClass('icon fa-globe');
				}
				tloc.append(t);
			} else {
				/*tt.click(function(e) {
                    alert('zoom');
                });*/
			}
		}
		
		r.append(ttt);
		
		//ttt = $('<article class="box">').attr('id', 'event' + data[i].id).append(r).attr('data-year', data[i].data.slice(-4));
		$(container).append( tt.append(r) );
	}
}

function get_home_events() {
	$('#news_feed').html('');

	$.ajax({
		url: '/news-events/eventlist.php',
		type: 'GET',
		dataType: 'jsonp',
		jsonpCallback: 'MyJSONPCallback',
		success: function(data){
			append_events_home(data);

		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

function append_events_home(data) {
	for (var i in data) { //
		r = $('<li>');
		//var s = '<b>' + data[i].data + '</b> ';
		var lk = $('<a>');
		lk.append( '<b class="icon fa-calendar"> ' + data[i].data + '</b> ');
		if (data[i].locandina>'') {
			lk.attr('href', '/news-events/locandine/' + data[i].locandina);
			lk.append('<span class="icon fa-eye">&nbsp;</span>');
		} else {
			lk.attr('href', 'eventi.html#event' + data[i].id);
			lk.append('<span class="icon fa-chevron-circle-right">&nbsp;</span>');
		}
		//s.append(
		lk.append( data[i].titolo + ' - <i>' + data[i].luogo + '</i>' );
		r.append( lk );
		$('#news_feed').append(r);
	}
	news_loaded();
}

