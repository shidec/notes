class Note{

    constructor(data, container, editItem, updatePositionItem, deleteItem){
        this.id = data.id;
        this.text = data.text;
        this.backgroundColor = data.backgroundColor;
        this.x = data.x;
        this.y = data.y;
        this.container = container;
        this.editItem = editItem;
        this.updatePositionItem = updatePositionItem;
        this.deleteItem = deleteItem;

        this.startX = 0;
        this.startY = 0;

        this.newX = this.x;
        this.newY = this.y;
    }

    render(){
        var self = this;
        const containerNote = document.createElement('div');
        containerNote.className = 'container-note';
        containerNote.style.backgroundColor = self.backgroundColor;
        containerNote.style.left = self.x + 'px';
        containerNote.style.top = self.y + 'px';
        
        const toolbarNote = document.createElement('div');
        toolbarNote.className = 'toolbar-note';

        //--add event to handle mouse drag
        toolbarNote.addEventListener('mousedown', function(e){
            this.startX = e.pageX;
            this.startY = e.pageY;
        });

        toolbarNote.addEventListener('mousemove', function(e){
            if(this.startX > 0 && this.startY > 0){
                self.newX = self.x - this.startX + e.pageX;
                self.newY = self.y - this.startY + e.pageY;

                containerNote.style.left = self.newX + 'px';
                containerNote.style.top = self.newY + 'px';
            }
        });

        toolbarNote.addEventListener('mouseup', function(e){
            self.x = self.newX;
            self.y = self.newY;

            self.updatePositionItem(self.id);
            this.startX = 0;
            this.startY = 0;
        });

        //--add event to handle touch
        //--add event to handle mouse drag
        toolbarNote.addEventListener('touchstart', function(e){
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        });

        toolbarNote.addEventListener('touchmove', function(e){
            
            if(this.startX > 0 && this.startY > 0){
                self.newX = self.x - this.startX + e.touches[0].pageX;
                self.newY = self.y - this.startY + e.touches[0].pageY;

                containerNote.style.left = self.newX + 'px';
                containerNote.style.top = self.newY + 'px';
            }
        });

        toolbarNote.addEventListener('touchend', function(e){
            self.x = self.newX;
            self.y = self.newY;

            self.updatePositionItem(self.id);
            this.startX = 0;
            this.startY = 0;
        });

        const btnNoteDelete = new Image(24, 24);
        btnNoteDelete.src = 'img/delete.png';
        btnNoteDelete.title = 'Delete';
        btnNoteDelete.alt = 'Delete';
        btnNoteDelete.className = 'btn-xs';
        btnNoteDelete.addEventListener('click', function(){
            if(confirm('Bener mau dihapus?')){
                self.deleteItem(self.id)
            }
        });
        toolbarNote.appendChild(btnNoteDelete);

        const btnNoteEdit = new Image(24, 24);
        btnNoteEdit.src = 'img/edit.png';
        btnNoteEdit.title = 'Edit';
        btnNoteEdit.alt = 'Edit';
        btnNoteEdit.className = 'btn-xs';
        btnNoteEdit.style.float = 'right';
        btnNoteEdit.addEventListener('click', function(){
            self.editItem(self.id, self.text, self.backgroundColor);
        });
        toolbarNote.appendChild(btnNoteEdit);

        containerNote.appendChild(toolbarNote);

        const contentNote = document.createElement('div');
        contentNote.className = 'content-note';
        contentNote.innerText = this.text;

        containerNote.appendChild(contentNote);

        this.container.appendChild(containerNote);
    }
}

export default Note;