
$(document).ready(function(){
    
    var Lista_Tipos = [];
    $.get("https://localhost:44363/Tipos" , function(response){
        
        response.forEach(element => {
            Lista_Tipos.push(element);
            
            
        });
        
        Lista_Tipos.forEach(ele => {
            
            $("#tipo").append(
                `
                    <option>${ele.tipoAnimal}</option>
                `
            );
            

        });
        $("#reg_mascota").click(function(){
            var tipo;
            Lista_Tipos.forEach(element =>{
                if (element.tipoAnimal === $("#tipo").val()) {
                    tipo = element.tipoAnimalId;
                    
                }
            });
            var MascotaDTO = {
                "nombre" : $("#nombre").val(),
                "imagen" : $("#imagen").val(),
                "historia" : $("#historia").val(),
                "peso" : parseFloat($("#peso").val()),
                "edad" : parseInt($("#edad").val()),
                "adoptado" : false,
                "TipoAnimalId" : tipo
            };
            console.log(MascotaDTO);
            debugger
            $.ajax({
                type : 'POST',
                url : "https://localhost:44363/api/Mascota",
                data : JSON.stringify(MascotaDTO),
                dataType : "json",
                contentType : "application/json" ,
                beforeSend :function(){
                    console.log(this.data);
                    console.log("enviando...");
                },
                success : function(response){
                    console.log(response);
                    $("#registro")[0].reset();
                    alert("Creado con exito")
                },
                error : function(response){
                    aconsole.log(response)
                }
            });

            
            
           
            
        });
        
       

    });
   
    
    
    
    
    
    
    


    

    
});