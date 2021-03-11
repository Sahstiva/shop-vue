class UserData {
    constructor(form) {
        this.form = document.querySelector(form),
        this.name,
        this.surname,
        this.phone,
        this.email,
        this.password,
        this._init()
    }

        _init() {
                this.form.addEventListener('submit', e => {
                e.preventDefault();
                this._fetch();
            });
        }

        _fetch() {
            this.name = this.form.querySelector('#name').value;
            this.surname = this.form.querySelector('#surname').value;
            this.phone = this.form.querySelector('#phone').value;
            this.email = this.form.querySelector('#email').value;
            this.password = this.form.querySelector('#password').value;  
            this._validate();              
        }

        _validate() {
            let checkName = this.name.match(/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/g);
            let checkSurname = this.surname.match(/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/g);
            let checkPhone = this.phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
            let checkEmail = this.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            let checkPassword = this.password.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);

            if(!checkName)
                this.form.querySelector('#name').classList.add('registration__form-wrong');
            else
                this.form.querySelector('#name').classList.remove('registration__form-wrong');

                if(!checkSurname)
                this.form.querySelector('#surname').classList.add('registration__form-wrong');
            else
                this.form.querySelector('#surname').classList.remove('registration__form-wrong');

            if(!checkPhone)
                this.form.querySelector('#phone').classList.add('registration__form-wrong');
            else
                this.form.querySelector('#phone').classList.remove('registration__form-wrong');

            if(!checkEmail)
                this.form.querySelector('#email').classList.add('registration__form-wrong');
            else
                this.form.querySelector('#email').classList.remove('registration__form-wrong');

            if(!checkPassword) {
                this.form.querySelector('#password').classList.add('registration__form-wrong');
                this.form.querySelector('.registration__form_text').classList.add('registration__form-wrong');
                console.log(this.form.querySelector('.registration__form_text').classList);                
            }
            else {
                this.form.querySelector('#password').classList.remove('registration__form-wrong');
                this.form.querySelector('.registration__form_text').classList.remove('registration__form-wrong');                
            }
            // console.log(this.password);
            // console.log(checkPassword);
        }
}

let user = new UserData('.registration__form');
