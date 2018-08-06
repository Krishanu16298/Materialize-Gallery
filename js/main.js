// Make sure service workers are enabled
if('serviceWorker' in navigator){
    // console.log('Service worker supported!');
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log(`Error: ${err}`));
    });
}