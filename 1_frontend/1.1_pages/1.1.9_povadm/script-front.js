const express = require ('express')
const app = express()
app.use(express.json())
app.listen(3000, () => console.log("up and running"))









function remover(){
  document.querySelectorAll('.remove-row').forEach(button => {
      button.addEventListener('click', function() {
          this.closest('tr').remove();
      });
  }); 
}