class CustomOverlay extends google.maps.OverlayView {
    constructor(latlng, map, imageSrc, rotation, text) {
        super();
        this.latlng = latlng;
        this.imageSrc = imageSrc;
        this.rotation = rotation;
        this.text = text;
        this.textColor = "rgb(161, 90, 173)";
        this.strokeColor = "black";
        this.div = null;
        this.setMap(map);
    };

    onAdd() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.padding = '5px';
        div.style.overflow = 'visible';

        if (this.imageSrc) {
            const img = document.createElement('img');
            img.src = this.imageSrc;
            img.style.transform = `rotate(${this.rotation}deg)`;
            img.style.width = '20px';
            img.style.height = '25px';
            img.style.marginRight = '5px';
            div.appendChild(img);
        }

        const textDiv = document.createElement('div');
        textDiv.style.color = this.textColor;
        textDiv.style.fontSize = '15px';
        textDiv.style.fontWeight = '600';
        textDiv.style.textAlign = 'center';
        textDiv.style.padding = '2px';
        textDiv.style.whiteSpace = 'nowrap';
        textDiv.style.letterSpacing = ".025rem";
        textDiv.style.textShadow = `
            -0.8px -0.8px 0 ${this.strokeColor},
            0.8px -0.8px 0 ${this.strokeColor},
            -0.8px 0.8px 0 ${this.strokeColor},
            0.8px 0.8px 0 ${this.strokeColor},
            0px -0.8px 0 ${this.strokeColor},
            -0.8px 0px 0 ${this.strokeColor},
            0.8px 0px 0 ${this.strokeColor},
            0px 0.8px 0 ${this.strokeColor}
        `;
        textDiv.innerText = this.text;
        div.appendChild(textDiv);

        this.div = div;
        const panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    };

    draw() {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(this.latlng);
        const div = this.div;
        div.style.left = position.x + 'px';
        div.style.top = position.y + 'px';
    };

    onRemove() {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    };
};