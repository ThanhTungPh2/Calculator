
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Calculator {
  constructor(options) {
    this.displayString = '';
    this.inputElement = $(options.inputBox);
    this.buttons =$$(options.numberBtn);
    this.operators = $$(options.operatorBtn)
    this.equal = $(options.equalBtn);
    this.deleteBtn = $(options.deleteBtn);
    this.clearBtn = $(options.clearBtn);
    this.flag = false;
    this.span = $(options.span);
  }

  main() {
    // Gán sự kiện ckick cho number and operator
    this.addEventClick(this.buttons);
    this.addEventClickO(this.operators);
    
    //Btn kết quả '='
    this.equal.onclick = () => {
      this.displayString = this.displayString.concat(this.inputElement.value);
      let c = Number(eval(this.displayString).toFixed(5));
      this.updateString('='+c.toString());
      this.flag = true;
      this.span.innerText = '';
    }

    this.deleteBtn.onclick = () => {
      let value = this.inputElement.value.slice(0, -1);
      this.displayString = this.displayString.slice(0, -1);
      this.updateString(value)
    }

    this.clearBtn.onclick = () => {
      this.updateString('');
      this.displayString = '';
      this.span.innerText = '';
    }

    document.addEventListener('keydown', (event) => {
      let listkey  = ['Enter','Backspace','0','1','2','3','4','5','6','7','8','9','.'];
      let name = event.key;
      let code = event.code;
      if(!listkey.includes(name))
        return;
      if(name === 'Enter')
        this.updateString(eval(this.inputElement.value).toString());
      // Alert the key name and key code on keydown
      // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);
  }
  updateString(value) {
    this.inputElement.value = value;
    console.log(this.inputElement.value);
  }

  addEventClick(arrayBtn) {
    arrayBtn.forEach((Btn) => {
      Btn.onclick = (e) => {
        if(this.flag){
          this.flag = false;
          this.updateString('');
          this.displayString = '';
        }
        this.updateString(this.inputElement.value.concat(`${e.target.value}`))
      }
    })
  }

  addEventClickO(arrayBtn) {
    arrayBtn.forEach((Btn) => {
      Btn.onclick = (e) => {
        this.updateString(this.inputElement.value.concat(`${e.target.value}`))
        this.displayString = this.inputElement.value;
        this.span.innerText = this.displayString
        this.updateString('');
      }
    })
  }
}
