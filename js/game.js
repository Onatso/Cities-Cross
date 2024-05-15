const cityNameElement = document.getElementById('city-name');

cityNameElement.addEventListener('mouseover', () => {
    cityNameElement.style.cursor = 'pointer';
});

cityNameElement.addEventListener('click', () => {
    const cityName = cityNameElement.textContent;
    const iframeElement = document.createElement('iframe');
    const closeButton = document.createElement('button');
    iframeElement.src = `https://ru.m.wikipedia.org/wiki/${cityName}`;
    iframeElement.width = '25%';
    iframeElement.height = '100%';
    iframeElement.style.position = 'absolute';
    iframeElement.style.top = '40px';
    iframeElement.style.right = '0';
    iframeElement.allowFullscreen = true;
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.color = 'red';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        iframeElement.remove();
        closeButton.remove();
    });
    document.body.appendChild(closeButton);
    document.body.appendChild(iframeElement);
});