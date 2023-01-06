export default class Section {
    constructor({data, renderer}, containerSelector){
        this._data = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear(){
        this._container.innerHTML = '';
    }

    renderItems(){
        this._clear();
        this._data.forEach(item => {
            this._renderer(item);
          });
    };

    addItem(item){
        this._container.prepend(item);
    }

}