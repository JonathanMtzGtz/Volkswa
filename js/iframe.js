




function adjustIframeHeight() {
    let iframe = document.querySelector('.privacidad iframe');
    if (iframe) {
        iframe.style.height = window.innerHeight * 0.8 + 'px';
    }
}

window.addEventListener('resize', adjustIframeHeight);
window.addEventListener('load', adjustIframeHeight);

