class Record {
    constructor(id, nom, classe, remarque, validated) {
        this._id = id;
        this._nom = nom;
        this._remarque = remarque;
        this._validated = validated;
        this._classe = classe;
    }

    elementToTR() {
        let toValidate = this._validated === true ? "" : `<a class="btn-floating waves-effect waves-light green darken-1" onclick="Record.validate($(this), ${this._id})"><i class="material-icons">done</i></a>`;
        let checked = this._validated ? "checked" : "";
        return `<tr class="parent-tr">
            <td>
                ${this._id}
                <input name="id" value="${this._id}" hidden>
            </td>
            <td>
                <span class="record-value">${this._nom}</span>
                <input name="nom" class="record-input" type="text" value="${this._nom}">
            </td>
            <td>
                <span class="record-value">${this._classe}</span>
                <input name="classe" class="record-input" type="text" value="${this._classe}">
            </td>
            <td>
                <span class="record-value">${this._remarque}</span>
                <input name="remarque" class="record-input" type="text" value="${this._remarque}">
            </td>
            <td>
                <span class="record-value">${this._validated}</span>
                <div class="switch record-input"><label>Validate<input name="validated" type="checkbox" ${checked}><span class="lever"></span>Invalidate</label></div>
            </td>
            <td>${toValidate}</td>
            <td>
                <a class="record-value btn-floating waves-effect waves-light yellow darken-2" onclick="Record.switchDisplay($(this))"><i class="material-icons">create</i></a>
                <a class="record-input btn-floating waves-effect waves-light green darken-1" onclick="Record.save($(this))"><i class="material-icons">done</i></a>
            </td>
            <td>
                <a class="record-value btn-floating waves-effect waves-light red darken-1"><i class="material-icons" onclick="Record.delete($(this), ${this._id})">delete</i></a>
                <a class="record-input btn-floating waves-effect waves-light red darken-1"><i class="material-icons" onclick="Record.switchDisplay($(this))">clear</i></a>
            </td>
        </tr>`
    }

    static switchDisplay(e) {
        let parent = e.closest(".parent-tr");
        parent.closest(parent.toggleClass("update-mode"))
    }

    static validate(e, id) {
        // change validated value
        let parent = e.closest(".parent-tr");
        parent.find("td:nth-child(5) span").text("true");
        parent.find("[name='validated']").prop("checked", true);

        e.css("display", "none");
        console.log(`You asked to validate the id ${id}`);
        $.ajax({
            url: `/admin/${id}`,
            type: 'PUT'
        });
    }

    static save(e) {
        Record.switchDisplay(e);

        let parent = e.closest(".parent-tr");

        let id = parent.find("[name='id']").val();
        let nom = parent.find("[name='nom']").val();
        let classe = parent.find("[name='classe']").val();
        let remarque = parent.find("[name='remarque']").val();
        let validated = parent.find("[name='validated']").prop("checked");

        parent.find("td:nth-child(2) span").text(nom);
        parent.find("td:nth-child(3) span").text(classe);
        parent.find("td:nth-child(4) span").text(remarque);
        parent.find("td:nth-child(5) span").text(validated);

        console.log(`id=${id}, nom=${nom}, classe=${classe}, remarque=${remarque}, validated=${validated}`);

        $.ajax({
            url: `/admin`,
            type: 'PUT',
            data: {id, nom, classe, remarque, validated}
        });
    }

    static delete(e, id) {
        $.ajax({
            url: `/admin/${id}`,
            type: 'DELETE'
        });
        e.closest(".parent-tr").remove();
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get nom() {
        return this._nom;
    }

    set nom(value) {
        this._nom = value;
    }

    get classe() {
        return this._classe;
    }

    set classe(value) {
        this._classe = value;
    }

    get remarque() {
        return this._remarque;
    }

    set remarque(value) {
        this._remarque = value;
    }

    get validated() {
        return this._validated;
    }

    set validated(value) {
        this._validated = value;
    }
}