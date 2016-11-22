import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

function init() {

	let iframes = document.querySelectorAll('.iframe');
	let maps = document.querySelectorAll('.map');


	[].forEach.call(iframes, function(i){
		loadIframe(i, i.getAttribute('data-iframe-src') );
	});

	[].forEach.call(maps, function(i){
	  loadMap(i, i.getAttribute('data-zoom'), i.getAttribute('data-center'), i.getAttribute('data-height'));
	});

}

function loadMap (el, zoom, center, height) {

	let cm = document.querySelector(".content__main")

	let w = (cm.clientWidth<1280)?cm.clientWidth:1280;
	let src = 'https://api.mapbox.com/styles/v1/guardian/civm88qkk00or2kl8vvutzbym/static/' + center + ',' + zoom + ',0.00,0.00/'+ w +'x' + height + '@2x?access_token=pk.eyJ1IjoiZ3VhcmRpYW4iLCJhIjoiNHk1bnF4OCJ9.25tK75EuDdgq5GxQKyD6Fg'
	el.src = src;

}

function loadIframe(el, link){

  let iframe;

  function _postMessage(message) {
      iframe.contentWindow.postMessage(JSON.stringify(message), '*');
  }

  if (link) {
      iframe = document.createElement('iframe');
     
      iframe.scrolling = 'no';
      iframe.style.border = 'none';
      iframe.height = '500';
      iframe.src = link;

      window.addEventListener('message', function(event) {
          if (event.source !== iframe.contentWindow) {
              return;
          }

          let message = JSON.parse(event.data);

          switch (message.type) {
              case 'set-height':
                  iframe.height = message.value;
                  break;
              case 'navigate':
                  document.location.href = message.value;
                  break;
              case 'scroll-to':
                  window.scrollTo(message.x, message.y);
                  break;
              case 'get-location':
                  _postMessage({
                      'id':       message.id,
                      'type':     message.type,
                      'hash':     window.location.hash,
                      'host':     window.location.host,
                      'hostname': window.location.hostname,
                      'href':     window.location.href,
                      'origin':   window.location.origin,
                      'pathname': window.location.pathname,
                      'port':     window.location.port,
                      'protocol': window.location.protocol,
                      'search':   window.location.search
                  }, message.id);
                  break;
              case 'get-position':
                  _postMessage({
                      'id':           message.id,
                      'type':         message.type,
                      'iframeTop':    iframe.getBoundingClientRect().top,
                      'innerHeight':  window.innerHeight,
                      'innerWidth':   window.innerWidth,
                      'pageYOffset':  window.pageYOffset
                  });
                  break;
               case 'embed-size':
               	let x = null;
               	break;
              default:
                 console.error('Received unknown action from iframe: ', message);
          }
      }, false);

      el.appendChild(iframe);
  }
}

init();