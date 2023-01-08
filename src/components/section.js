export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear(){
        this._container.innerHTML = '';
    }

    renderItems(data){
        this._clear();
        data.forEach(item => {
            this._renderer(item);
          });
    };

    addItem(item){
        this._container.append(item);
    }
}