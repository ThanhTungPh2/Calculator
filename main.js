
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
  }

  main() {
    // Gán sự kiện ckick cho number and operator
    this.addEventClick(this.buttons);
    this.addEventClick(this.operators);
    
    //Btn kết quả '='
    this.equal.onclick = () => {
      let c = Number(eval(this.inputElement.value).toFixed(5));
      this.updateString(c.toString());
    }

    this.deleteBtn.onclick = () => {
      let value = this.displayString.slice(0, -1);
      this.updateString(value)
    }

    this.clearBtn.onclick = () => {
      this.updateString('')
    }

    this.inputElement.oninput = (e) => {
      this.updateString(e.target.value)
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
      alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);
  }
  updateString(value) {
    this.displayString = value;
    this.inputElement.value = this.displayString;
    console.log(this.displayString);
  }

  addEventClick(arrayBtn) {
    arrayBtn.forEach((Btn) => {
      Btn.onclick = (e) => {
        this.displayString = this.displayString.concat(`${e.target.value}`);
        console.log(this.displayString)
        this.inputElement.value = this.displayString;
      }
    })
  }
}
